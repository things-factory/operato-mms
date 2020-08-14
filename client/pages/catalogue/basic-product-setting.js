import { getCodeByName } from '@things-factory/code-base'
import { MultiColumnFormStyles } from '@things-factory/form-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { client, CustomAlert } from '@things-factory/shell'
import { gqlBuilder } from '@things-factory/utils'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'
import { PRODUCT_TYPE } from './constants'

class BasicProductSetting extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      storageTypes: Array,
      productInfo: Object,
      _files: Array,
      _attachments: Array
    }
  }

  static get styles() {
    return [
      MultiColumnFormStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: white;
        }
        .form-container {
          overflow-y: auto;
          flex: 1;
        }
      `
    ]
  }

  constructor() {
    super()
    this.storageTypes = []
    this._files = []
    this._attachments = []
  }

  get inputForm() {
    return this.shadowRoot.querySelector('form#input-form')
  }

  get _document() {
    return this.shadowRoot.querySelector('#uploadImages')
  }

  render() {
    return html`
      <div class="form-container">
        <form id="input-form" class="multi-column-form">
          <fieldset>
            <legend>${i18next.t('title.select_product_type')}</legend>
            ${PRODUCT_TYPE.map(
              (product, idx) => html`
                <input
                  id="product-type-${idx}"
                  type="radio"
                  name="productType"
                  value="${product.value}"
                  ?checked="${idx === 0}"
                />
                <label for="product-type-${idx}">${i18next.t(product.name)}</label>
              `
            )}
          </fieldset>

          <fieldset>
            <legend>${i18next.t('title.product_details')}</legend>
            <label>${i18next.t('label.product_name')}</label>
            <input name="name" required />

            <label>${i18next.t('label.isku')}</label>
            <input name="isku" required />

            <label>${i18next.t('label.weight') + ' (kg)'}</label>
            <input type="number" min="0" name="weight" required />

            <label>${i18next.t('label.height') + ' (cm)'}</label>
            <input type="number" min="0" name="packageHeight" required />

            <label>${i18next.t('label.width') + ' (cm)'}</label>
            <input type="number" min="0" name="packageWidth" required />

            <label>${i18next.t('label.length') + ' (cm)'}</label>
            <input type="number" min="0" name="packageLength" required />

            <label>${i18next.t('label.cost_price')}</label>
            <input type="number" min="0" name="costPrice" required />

            <label>${i18next.t('label.storage_type')}</label>
            <select name="storageType" required>
              <option value="">--${i18next.t('label.select_a_type')}--</option>
              ${(this.storageTypes || []).map(
                storageType =>
                  html` <option value="${storageType && storageType.name}">${storageType && storageType.name}</option> `
              )}
            </select>
          </fieldset>

          <fieldset>
            <legend>${i18next.t('title.product_images')}</legend>
            <label>${i18next.t('label.images')}</label>
            <file-uploader
              name="attachments"
              id="uploadImages"
              label="${i18next.t('label.upload_images')}"
              accept="*"
              multiple="true"
              custom-input
            ></file-uploader>
          </fieldset>
        </form>
      </div>

      <div class="do-attachment-container" ?hidden="${this._attachments.length > 0 ? false : true}">
        <form name="doAttachment" class="multi-column-form">
          <fieldset>
            <legend>${i18next.t('title.uploaded_images')}</legend>
            <div class="do-preview">
              ${(this._attachments || []).map(
                attachment =>
                  html`
                    <image-viewer
                      name="${attachment.name}"
                      src="${location.origin}/attachment/${attachment.path}"
                      .mimetype="${attachment.mimetype}"
                      .downloadable="${this._downloadable}"
                    ></image-viewer>
                  `
              )}
            </div>
          </fieldset>
        </form>
      </div>
    `
  }

  async firstUpdated() {
    this.storageTypes = await getCodeByName('STORAGE_TYPES')
    if (this.productInfo?.name && this.productInfo?.isku) await fetchBasicProduct()
  }

  // async updated(changeProps) {
  //   if (changeProps.has('_files') && !this._files?.length) {
  //     this._document.reset()
  //   }
  // }

  async fetchBasicProduct() {
    const response = await client.query({
      query: gql`
        query {
          marketplaceProduct(${gqlBuilder.buildArgs({
            name: this.productInfo.name,
            isku: this.productInfo.isku
          })}) {
            id
            name
            isku
            weight
            packageHeight
            packageLength
            packageWidth
            costPrice
            type
            status
            attachment {
              id
              name
              refBy
              path
              mimetype
            }
          }
        }
      `
    })

    if (!response.errors) {
      const marketplaceProduct = response.data.marketplaceProduct
      this._fillupProdForm({ ...marketplaceProduct, storageType: marketplaceProduct.type })

      if (marketplaceProduct && marketplaceProduct?.attachment) {
        this._attachments = marketplaceProduct && marketplaceProduct.attachment
      }
    }
  }

  async commit() {
    try {
      this._validateProductInformation()

      const result = await CustomAlert({
        title: i18next.t('title.are_you_sure'),
        text: i18next.t('text.create_a_draft_product'),
        confirmButton: { text: i18next.t('button.confirm') },
        cancelButton: { text: i18next.t('button.cancel') }
      })
      if (!result.value) return

      let marketplaceProduct = this._getFormInfo()
      const args = marketplaceProduct
      delete args.productType

      const attachments = this._document?.files ? this._document.files : undefined

      const response = await client.query({
        query: gql`
          mutation ($attachments: Upload) {
            upsertMarketplaceProduct(${gqlBuilder.buildArgs({ marketplaceProduct: args })}, file:$attachments) 
            {
              id
              name
            }
          }
        `,
        variables: {
          attachments
        },
        context: {
          hasUpload: true
        }
      })

      if (!response.errors) {
        this._showToast({ message: i18next.t('text.draft_product_has_been_created_successfully') })
        this.dispatchEvent(new CustomEvent('submit', { marketplaceProduct }))
        return true
      }
    } catch (e) {
      this._showToast(e)
      return false
    }
  }

  _validateProductInformation() {
    if (!this.inputForm.checkValidity()) throw new Error(i18next.t('text.form_is_incomplete'))
  }

  _fillupProdForm(data) {
    this._fillupForm(this.inputForm, data)
  }

  _fillupForm(form, data) {
    for (let key in data) {
      Array.from(form.querySelectorAll('input, textarea, select')).forEach(field => {
        if (field.name === key && field.type === 'checkbox') {
          field.checked = data[key]
        } else if (field.name === key) {
          field.value = data[key]
        }
      })
    }
  }

  _getFormInfo() {
    return this._serializeForm(this.inputForm)
  }

  _serializeForm(form) {
    let obj = {}
    Array.from(form.querySelectorAll('input, select')).forEach(field => {
      if (!field.hasAttribute('hidden') && field.value) {
        obj[field.name] = field.type === 'checkbox' ? field.checked : field.value
      }

      if (field.type === 'number') {
        obj[field.name] = parseFloat(field.value)
      }
    })

    return obj
  }

  _clearView() {
    if (this.inputForm) this.inputForm.reset()
  }

  _showToast({ type, message }) {
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          type,
          message
        }
      })
    )
  }
}

window.customElements.define('basic-product-setting', BasicProductSetting)
