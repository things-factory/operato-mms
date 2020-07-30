import '@material/mwc-button/mwc-button'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { openPopup } from '@things-factory/layout-base'
import { client } from '@things-factory/shell'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'

class createNewProduct extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          padding: 10px;
          display: flex;
          flex-direction: column;
          overflow-x: overlay;
          background-color: var(--main-section-background-color);
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

  static get properties() {
    return {
      config: Object,
      data: Object,
      _inputFields: Object,
      productInformation: Object
    }
  }
  get dataGrist() {
    return this.shadowRoot.querySelector('data-grist')
  }
  get inputForm() {
    return this.shadowRoot.querySelector('form#input-form')
  }
  get productNameInput() {
    return this.shadowRoot.querySelector('input[name=name]')
  }
  get productDescriptionInput() {
    return this.shadowRoot.querySelector('input[name=description]')
  }
  get itemSkuInput() {
    return this.shadowRoot.querySelector('input[name=itemSku]')
  }
  get productWeightInput() {
    return this.shadowRoot.querySelector('input[name=weight]')
  }
  get packageWidthInput() {
    return this.shadowRoot.querySelector('input[name=packageWidth]')
  }
  get packageHeightInput() {
    return this.shadowRoot.querySelector('input[name=packageHeight]')
  }
  get packageLengthInput() {
    return this.shadowRoot.querySelector('input[name=packageLength]')
  }
  get productStockInput() {
    return this.shadowRoot.querySelector('input[name=stock]')
  }
  get stockBufferInput() {
    return this.shadowRoot.querySelector('input[name=stockBuffer]')
  }
  get availableToPurchaseInput() {
    return this.shadowRoot.querySelector('input[name=availableToPurchase]')
  }
  render() {
    return html`
      <form id="input-form" class="single-column-form">
        <fieldset>
          <legend>${'01. ' + i18next.t('title.product_details')}</legend>
          <label>${i18next.t('label.product_name')}</label>
          <input name="name" required />
          <label>${i18next.t('label.isku')}</label>
          <input name="itemSku" required />
          <br />
          <br />
          <label>${i18next.t('label.description')}</label>
          <input name="description" />
        </fieldset>
        <br />
        <fieldset>
          <legend>${'02. ' + i18next.t('title.dimensions')}</legend>
          <label>${i18next.t('label.weight')}</label>
          <input type="number" min="0" name="weight" required />
          <label>${i18next.t('label.height')}</label>
          <input type="number" min="0" name="packageHeight" required />
          <label>${i18next.t('label.width')}</label>
          <input type="number" min="0" name="packageWidth" required />
          <label>${i18next.t('label.length')}</label>
          <input type="number" min="0" name="packageLength" required />
        </fieldset>
        <br />
        <fieldset>
          <legend>${'03. ' + i18next.t('title.stock_details')}</legend>
          <label>${i18next.t('label.total_stock')}</label>
          <input type="number" min="1" name="stock" required />
          <label>${i18next.t('label.buffer_stock')}</label>
          <input type="number" name="stockBuffer" />
          <label>${i18next.t('label.available_stock')}</label>
          <input type="number" name="availableToPurchase" />
        </fieldset>
      </form>
      <br />
      <div class="button-container">
        <mwc-button @click=${this._inspecting.bind(this)}>${i18next.t('button.save')}</mwc-button>
      </div>
    `
  }

  firstUpdated() {
    this.config = {
      rows: { selectable: { multiple: true }, appendable: false },
      columns: [
        {
          type: 'string',
          name: 'itemSku',
          header: i18next.t('field.isku'),
          imex: { header: i18next.t('field.isku'), key: 'itemSku', width: 25, type: 'string' },
          record: { editable: true, align: 'center' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          sortable: true,
          width: 180
        },
        {
          type: 'integer',
          name: 'stock',
          header: i18next.t('field.stock'),
          sortable: true,
          width: 80
        },
        {
          type: 'integer',
          name: 'stockBuffer',
          header: i18next.t('field.stock_buffer'),
          record: { align: 'left' },
          sortable: true,
          width: 100
        },
        {
          type: 'integer',
          name: 'onHold',
          header: i18next.t('field.on_hold'),
          record: { align: 'center' },
          sortable: true,
          width: 80
        },
        {
          type: 'integer',
          name: 'availableToPurchase',
          header: i18next.t('field.available_to_purchase'),
          record: { align: 'center' },
          sortable: true,
          width: 150
        },
        {
          type: 'integer',
          name: 'soldStock',
          header: i18next.t('field.sold_stock'),
          record: { align: 'center' },
          sortable: true,
          width: 150
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.last_updated'),
          record: { align: 'center' },
          sortable: true,
          width: 180
        }
      ]
    }
  }
  get dataGrist() {
    return this.shadowRoot.querySelector('data-grist')
  }

  async _inspecting(e) {
    try {
      await this._validateNewProduct()
      const marketplaceProduct = {
        name: this.productNameInput.value,
        availableToPurchase: parseInt(this.availableToPurchaseInput.value),
        itemSku: this.itemSkuInput.value,
        packageHeight: parseInt(this.packageHeightInput.value),
        packageLength: parseInt(this.packageLengthInput.value),
        packageWidth: parseInt(this.packageWidthInput.value),
        description: parseInt(this.productDescriptionInput.value),
        stock: parseInt(this.productStockInput.value),
        weight: parseFloat(this.productWeightInput.value),
        soldStock: parseInt(this.stockBufferInput.value)
      }
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

  _focusOnInput(target) {
    setTimeout(() => target.focus(), 100)
  }

  async _validateNewProduct() {
    //validate the input
    //product name
    if (!this.productNameInput.value) {
      this._focusOnInput(this.productNameInput)
      throw new Error(i18next.t('text.product_name_is_empty'))
    }
    //product ISKU
    if (!this.itemSkuInput.value) {
      this._focusOnInput(this.itemSkuInput)
      throw new Error(i18next.t('text.isku_is_empty'))
    }
    //product weight
    if (!this.productWeightInput.value) {
      this._focusOnInput(this.productWeightInput)
      throw new Error(i18next.t('text.product_weight_is_empty'))
    }
    //package height
    if (!this.packageHeightInput.value) {
      this._focusOnInput(this.packageHeightInput)
      throw new Error(i18next.t('text.package_height_is_empty'))
    }
    //package width
    if (!this.packageWidthInput.value) {
      this._focusOnInput(this.packageWidthInput)
      throw new Error(i18next.t('text.package_width_is_empty'))
    }
    //package length
    if (!this.packageLengthInput.value) {
      this._focusOnInput(this.packageLengthInput)
      throw new Error(i18next.t('text.package_length_is_empty'))
    }
    //product stock
    if (!this.productStockInput.value) {
      this._focusOnInput(this.productStockInput)
      throw new Error(i18next.t('text.product_stock_is_empty'))
    }
  }
  async fetchHandler({ page, limit, sorters = [] }) {
    try {
      const response = await client.query({
        query: gql`
      query {
        marketplaceProducts(${gqlBuilder.buildArgs({
          filters: null,
          pagination: { page, limit },
          sortings: sorters
        })}) {
          items {
            id
            name
            itemSku
            updatedAt
            stock
            stockBuffer
            onHold
            availableToPurchase
            soldStock
            originalPrice
            actions
          }
          total
        }
      }`
      })
      if (!response.errors) {
        return {
          total: response.data.marketplaceProducts.total || 0,
          records: response.data.marketplaceProducts.items || []
        }
      }
    } catch (e) {
      this._showToast(e)
    }
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
  async _saveMarketplaceProduct() {
    let patches = this.inputForm.exportPatchList({ flagName: 'cuFlag' })
    if (patches && patches.length) {
      const response = await client.query({
        query: gql`
          mutation {
            updateMultipleMarketplaceProduct(${gqlBuilder.buildArgs({
              patches
            })}) {
              name 
              stock
            }
          }
        `
      })

      if (!response.errors) {
        this.dataGrist.fetch()
        document.dispatchEvent(
          new CustomEvent('notify', {
            detail: {
              message: i18next.t('text.product_added_successfully')
            }
          })
        )
      }
    }
  }
}

window.customElements.define('create-new-product', createNewProduct)
