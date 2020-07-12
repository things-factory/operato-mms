import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView, client } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import gql from 'graphql-tag'
import { getCodeByName } from '@things-factory/code-base'
import { ScrollbarStyles } from '@things-factory/styles'

class InventoryProducts extends localize(i18next)(PageView) {
  static get properties() {
    return {}
  }
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;

          overflow: hidden;
        }

        search-form {
          overflow: visible;
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
      _searchFields: Array,
      config: Object,
      data: Object
    }
  }
  get context() {
    return {
      title: i18next.t('title.products'),
      actions: [
        { title: i18next.t('button.add-product'), action: null },
        { title: i18next.t('button.sync'), action: null },
        { title: i18next.t('button.more_vert'), action: null }
      ],
      exportable: {
        name: i18next.t('title.products'),
        data: null
      }
    }
  }

  render() {
    return html`
      <search-form id="search-form" .fields=${this._searchFields} @submit=${e => this.dataGrist.fetch()}></search-form>
      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler="${this.fetchHandler.bind(this)}"
      >
      </data-grist>
    `
  }
  async pageInitialized() {
    this.config = {
      rows: { selectable: { multiple: true }, appendable: false },
      columns: [
        { type: 'gutter', gutterName: 'dirty' },
        { type: 'gutter', gutterName: 'sequence' },
        { type: 'gutter', gutterName: 'row-selector', multiple: true },
        {
          type: 'string',
          name: 'isku',
          header: i18next.t('field.isku'),
          record: { align: 'left' },
          sortable: true,
          width: 150
          // handlers: {
          //   click: this._showInventoryInfo.bind(this)
          // }
        },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.product-name'),
          sortable: true,
          width: 180
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.updater'),
          record: { align: 'center' },
          sortable: true,
          width: 100
        },
        {
          type: 'integer',
          name: 'totalStock',
          header: i18next.t('field.stock'),
          record: { align: 'left' },
          sortable: true,
          width: 100
        },
        {
          type: 'integer',
          name: 'stockBuffer',
          header: i18next.t('field.stock-buffer'),
          record: { align: 'left' },
          sortable: true,
          width: 80
        },
        {
          type: 'integer',
          name: 'onHold',
          header: i18next.t('field.hold'),
          record: { align: 'center' },
          sortable: true,
          width: 100
        },
        {
          type: 'integer',
          name: 'availableToPurchase',
          header: i18next.t('field.available-to-purchase'),
          record: { align: 'center' },
          sortable: true,
          width: 150
        },
        {
          type: 'integer',
          name: 'soldStock',
          header: i18next.t('field.sold-stock'),
          record: { align: 'center' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'actions',
          header: i18next.t('field.actions'),
          record: { align: 'center' },
          sortable: true,
          width: 100
        }
      ]
    }
    this._searchFields = [
      {
        label: i18next.t('field.product-name'),
        name: 'name',
        type: 'text',
        queryName: 'items',
        field: 'name',
        props: { searchOp: 'i_like' }
      }
    ]
  }
  async pageUpdated(changes, lifecycle) {
    if (this.active) {
      this.dataGrist.fetch()
    }
  }

  get dataGrist() {
    return this.shadowRoot.querySelector('data-grist')
  }

  get searchForm() {
    return this.shadowRoot.querySelector('search-form')
  }

  get _columns() {
    return this.config.columns
  }
  async fetchHandler({ page, limit, sorters = [] }) {
    const response = await client.query({
      query: gql`
      query {
        marketplaceProducts(${gqlBuilder.buildArgs({
          filters: await this.searchForm.getQueryFilters(),
          pagination: { page, limit },
          sortings: sorters
        })}) {
          items {
            id
            name
            isku
            updatedAt
            totalStock
            stockBuffer
            onHold
            availableToPurchase
            soldStock
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
  }
  stateChanged(state) {}
}

customElements.define('mms-inventory-products', InventoryProducts)
