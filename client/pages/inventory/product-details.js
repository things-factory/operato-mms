import '@material/mwc-button/mwc-button'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { openPopup } from '@things-factory/layout-base'
import { client } from '@things-factory/shell'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'

class productDetails extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        data-grist {
          overflow-y: auto;
          flex: 1;
        }
      `
    ]
  }

  static get properties() {
    return {
      config: Object,
      data: Object,
      productId: String
    }
  }

  render() {
    return html`
      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler="${this.fetchHandler.bind(this)}"
      ></data-grist>
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

  async fetchHandler({ page, limit, sorters = [] }) {
    try {
      const response = await client.query({
        query: gql`
      query {
        marketplaceProducts(${gqlBuilder.buildArgs({
          filters: [{ name: 'id', operator: 'eq', value: this.productId }],
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
}

window.customElements.define('product-detail', productDetails)
