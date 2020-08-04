import '@material/mwc-button/mwc-button'
import { getCodeByName } from '@things-factory/code-base'
import { MultiColumnFormStyles, SingleColumnFormStyles } from '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { client } from '@things-factory/shell'
import { gqlBuilder } from '@things-factory/utils'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'
import { PRODUCT_TYPE } from './constants'

class CreateNewProdutPopup extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      config: Object,
      data: Object,
      productInformation: Object,
      storageTypes: Array,
      _inputFields: Object
    }
  }

  static get styles() {
    return [
      MultiColumnFormStyles,
      SingleColumnFormStyles,
      css`
        :host {
          padding: 10px;
          display: flex;
          flex-direction: column;
          overflow-x: overlay;
          background-color: var(--main-section-background-color);
        }
        .grist {
          background-color: var(--main-section-background-color);
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow-y: auto;
        }
        data-grist {
          overflow-y: hidden;
          flex: 1;
        }
        .button-container {
          padding: var(--button-container-padding);
          margin: var(--button-container-margin);
          text-align: var(--button-container-align);
          background-color: var(--button-container-background);
          height: var(--button-container-height);
        }
        .button-container button {
          background-color: var(--button-container-button-background-color);
          border-radius: var(--button-container-button-border-radius);
          height: var(--button-container-button-height);
          border: var(--button-container-button-border);
          margin: var(--button-container-button-margin);

          padding: var(--button-padding);
          color: var(--button-color);
          font: var(--button-font);
          text-transform: var(--button-text-transform);
        }
        .button-container button:hover,
        .button-container button:active {
          background-color: var(--button-background-focus-color);
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
          <input name="sku" required />

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
          <select name="storageType">
            <option value="">--${i18next.t('label.please_select_a_storage_type')}--</option>
            ${(this.storageTypes || []).map(
              storageType =>
                html` <option value="${storageType && storageType.name}">${storageType && storageType.name}</option> `
            )}
          </select>
        </fieldset>

        <fieldset>
          <legend>${i18next.t('title.inventory_details')}</legend>
          <label>${i18next.t('label.available_stock')}</label>
          <input type="number" name="qty" />

          <label>${i18next.t('label.buffer_stock')}</label>
          <input type="number" name="stockBuffer" />

          <label>${i18next.t('label.threshold_value')}</label>
          <input type="number" min="1" name="stockThreshold" required />
        </fieldset>

        <fieldset>
          <legend>${i18next.t('title.channel_sku_information')}</legend>
          <label>${i18next.t('label.channel_sku')}</label>
          <input name="qty" />

          <label>${i18next.t('label.pricing_mrp')}</label>
          <input type="number" min="1" name="mrpPrice" required />

          <label>${i18next.t('label.selling_price')}</label>
          <input type="number" min="1" name="sellPrice" required />
        </fieldset>
      </form>

      <div class="button-container">
        <button @click=${this._createProduct.bind(this)}>${i18next.t('button.create')}</button>
      </div>
    `
  }

  async firstUpdated() {
    this.storageTypes = await getCodeByName('STORAGE_TYPES')
  }

  async _createProduct(e) {
    try {
      await this._validateProductInformation()

      const response = await client.query({
        query: gql`
            mutation {
              createMarketplaceProduct(${gqlBuilder.buildArgs({
                marketplaceProduct
              })}){
                name
                description
                availableToPurchase
                itemSku
                packageHeight
                packageWidth
                packageLength
                stock
                weight
                soldStock
              }
            }
          `
      })
      if (!response.errors) {
        //resetting the values
        this.availableToPurchaseInput.value = ''
        this.itemSkuInput.value = ''
        this.packageHeightInput.value = ''
        this.packageLengthInput.value = ''
        this.packageWidthInput.value = ''
        this.productNameInput.value = ''
        this.productStockInput.value = ''
        this.productWeightInput.value = ''
        this.stockBufferInput.value = ''
        this.productDescriptionInput.value = ''
        document.dispatchEvent(
          new CustomEvent('notify', {
            detail: {
              message: i18next.t('text.data_updated_successfully')
            }
          })
        )
      }
    } catch (e) {
      this._showToast(e)
    }
  }

  async _validateProductInformation() {}

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

window.customElements.define('create-new-product-popup', CreateNewProdutPopup)
