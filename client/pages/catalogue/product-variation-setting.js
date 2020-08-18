import { getCodeByName } from '@things-factory/code-base'
import { MultiColumnFormStyles } from '@things-factory/form-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { client } from '@things-factory/shell'
import { gqlBuilder } from '@things-factory/utils'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'
import '../components/variant-options-editor'

class ProductVariationSetting extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      productInfo: Object,
      variationTypes: Array
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
          overflow-y: auto;
          background-color: white;
        }
        .form-container {
          flex: 1;
        }
      `
    ]
  }

  get inputForm() {
    return this.shadowRoot.querySelector('form#input-form')
  }

  constructor() {
    super()
    this.variationTypes = []
  }

  render() {
    console.log(this.variationTypes)
    return html`
      <div class="form-container">
        <form id="input-form" class="multi-column-form">
          <fieldset>
            <legend>${i18next.t('title.group_product_variants')}</legend>
            <variant-options-editor .types=${this.variationTypes}></variant-options-editor>
          </fieldset>
        </form>
      </div>

      <div class="form-container">
        <form id="input-form" class="multi-column-form">
          <fieldset>
            <legend>${i18next.t('title.product_variant_details')}</legend>
            <label>${i18next.t('label.channel_sku')}</label>
            <input name="channelSKU" required />

            <label>${i18next.t('label.isku')}</label>
            <input name="isku" required />

            <label>${i18next.t('label.pricing_mrp')}</label>
            <input type="number" min="1" name="mrpPrice" required />

            <label>${i18next.t('label.selling_price')}</label>
            <input type="number" min="1" name="sellPrice" required />

            <label>${i18next.t('label.available_stock')}</label>
            <input type="number" name="qty" />

            <label>${i18next.t('label.threshold_value')}</label>
            <input type="number" min="1" name="stockThreshold" required />
          </fieldset>
        </form>
      </div>
    `
  }

  async firstUpdated() {
    const varTypes = await getCodeByName('VARIATION_TYPES')
    this.variationTypes = varTypes.map(varType => varType.name)
  }

  async _commit() {
    try {
      this._validateVariationInformation()

      const result = await CustomAlert({
        title: i18next.t('title.are_you_sure'),
        text: i18next.t('text.create_new_variation_draft'),
        confirmButton: { text: i18next.t('button.confirm') },
        cancelButton: { text: i18next.t('button.cancel') }
      })
      if (!result.value) return

      let marketplaceProductVariation = this._getFormInfo()
      const args = marketplaceProductVariation
      args.marketplaceProduct = this.productInfo

      const response = await client.query({
        query: gql`
            mutation {
              upsertMarketplaceProductVariation(${gqlBuilder.buildArgs(args)}) 
              {
                id
                name
              }
            }
          `
      })
      if (!response.errors) {
        this._showToast({ message: i18next.t('text.draft_variation_has_been_created_successfully') })
        this.dispatch(new CustomEvent('submit', { marketplaceProductVariation, marketplaceProduct }))
        return true
      }
    } catch (e) {
      this._showToast(e)
    }
  }

  async _validateVariationInformation() {
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

window.customElements.define('product-variation-setting', ProductVariationSetting)
