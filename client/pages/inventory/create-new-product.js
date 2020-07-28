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
      _inputFields: Array
    }
  }

  render() {
    return html`
      <form
        id="input-form"
        class="single-column-form"
        .fields=${this._inputFields}
        @submit=${e => this.inputForm.fetch()}
      >
        <fieldset>
          <legend>${'01. ' + i18next.t('title.product_details')}</legend>
          <label>${i18next.t('label.product_name')}</label>
          <input name="name" />
          <label>${i18next.t('label.isku')}</label>
          <input name="description" />
          <br />
          <br />
          <label>${i18next.t('label.description')}</label>
          <input name="itemSku" />
        </fieldset>
        <br />
        <fieldset>
          <legend>${'02. ' + i18next.t('title.dimensions')}</legend>
          <label>${i18next.t('label.weight')}</label>
          <input name="weight" />
          <label>${i18next.t('label.height')}</label>
          <input name="packageHeight" />
          <label>${i18next.t('label.width')}</label>
          <input name="packageWidth" />
          <label>${i18next.t('label.length')}</label>
          <input name="packageLength" />
        </fieldset>
        <br />
        <fieldset>
          <legend>${'03. ' + i18next.t('title.stock_details')}</legend>
          <label>${i18next.t('label.total_stock')}</label>
          <input name="stock" />
          <label>${i18next.t('label.buffer_stock')}</label>
          <input name="stockBuffer" />
          <label>${i18next.t('label.available_stock')}</label>
          <input name="availableToPurchase" />
        </fieldset>
      </form>
      <br />
      <div class="button-container">
        <mwc-button @click=${this._saveMarketplaceProduct.bind(this)}>${i18next.t('button.save')}</mwc-button>
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
  get inputForm() {
    return this.shadowRoot.querySelector('form#input-form')
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
              message: i18next.t('text.data_updated_successfully')
            }
          })
        )
      }
    }
  }
}

window.customElements.define('create-new-product', createNewProduct)
