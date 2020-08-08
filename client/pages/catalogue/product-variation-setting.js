import { getCodeByName } from '@things-factory/code-base'
import { MultiColumnFormStyles } from '@things-factory/form-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { client } from '@things-factory/shell'
import { gqlBuilder } from '@things-factory/utils'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'
import { WizardViewStyles } from '../components/wizard-view-styles'

class ProductVariationSetting extends localize(i18next)(LitElement) {
  static get properties() {
    return {}
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
  }

  get inputForm() {
    return this.shadowRoot.querySelector('form#input-form')
  }

  render() {
    return html`
      <div class="form-container">
        <form id="input-form" class="multi-column-form">
          <fieldset>
            <legend>${i18next.t('title.inventory_details')}</legend>
            <label>${i18next.t('label.available_stock')}</label>
            <input type="number" name="qty" />

            <label>${i18next.t('label.threshold_value')}</label>
            <input type="number" min="1" name="stockThreshold" required />
          </fieldset>

          <fieldset>
            <legend>${i18next.t('title.channel_sku_information')}</legend>
            <label>${i18next.t('label.channel_sku')}</label>
            <input name="channelSKU" />

            <label>${i18next.t('label.pricing_mrp')}</label>
            <input type="number" min="1" name="mrpPrice" required />

            <label>${i18next.t('label.selling_price')}</label>
            <input type="number" min="1" name="sellPrice" required />

            <label>${i18next.t('label.images')}</label>
            <file-uploader custom-input required name="prodImg" ._files=""></file-uploader>
          </fieldset>
        </form>
      </div>
    `
  }

  async firstUpdated() {
    this.storageTypes = await getCodeByName('STORAGE_TYPES')
  }

  async _createProduct() {
    try {
      this._validateProductInformation()

      const result = await CustomAlert({
        title: i18next.t('title.are_you_sure'),
        text: i18next.t('text.create_new_product'),
        confirmButton: { text: i18next.t('button.confirm') },
        cancelButton: { text: i18next.t('button.cancel') }
      })
      if (!result.value) return

      let marketplaceProduct = this._getFormInfo()
      const args = marketplaceProduct

      const response = await client.query({
        query: gql`
            mutation ($attachments: Upload) {
              createMarketplaceProduct(${gqlBuilder.buildArgs(args)}, file:$attachments) {
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
        this._clearView()
      }
    } catch (e) {
      this._showToast(e)
    }
  }

  async _validateProductInformation() {
    if (!this.inputForm.checkValidity()) throw new Error(i18next.t('text.form_is_incomplete'))
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

window.customElements.define('product-variation-setting', ProductVariationSetting)