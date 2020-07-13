import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView, client, CustomAlert } from '@things-factory/shell'
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
        { title: i18next.t('button.save'), action: this._saveMarketplaceProduct.bind(this) },
        { title: i18next.t('button.delete'), action: this._deleteMarketplaceProduct.bind(this) }
        //{ title: i18next.t('button.more_vert'), action: null }
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
          record: { editable: true, align: 'left' },
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
          record: {
            editable: true
          },
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
          record: {
            editable: true
          },
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
    await this.updateComplete

    this.dataGrist.fetch()
  }
  async pageUpdated(changes, lifecycle) {
    if (this.active) {
      await this.updateComplete
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
  async _saveMarketplaceProduct() {
    let patches = this.dataGrist.exportPatchList({ flagName: 'cuFlag' })
    if (patches && patches.length) {
      const response = await client.query({
        query: gql`
          mutation {
            updateMultipleMarketplaceProduct(${gqlBuilder.buildArgs({
              patches
            })}) {
              name
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
  async _deleteMarketplaceProduct() {
    CustomAlert({
      title: i18next.t('text.are_you_sure'),
      text: i18next.t('text.you_wont_be_able_to_revert_this'),
      type: 'warning',
      confirmButton: { text: i18next.t('button.delete'), color: '#22a6a7' },
      cancelButton: { text: i18next.t('button.cancel'), color: '#cfcfcf' },
      callback: async result => {
        if (result.value) {
          const names = this.dataGrist.selected.map(record => record.name)
          if (names && names.length > 0) {
            const response = await client.query({
              query: gql`
                mutation($names: [String]!) {
                  deleteMarketplaceProducts(names: $names)
                }
              `,
              variables: {
                names
              }
            })

            if (!response.errors) {
              this.dataGrist.fetch()
              document.dispatchEvent(
                new CustomEvent('notify', {
                  detail: {
                    message: i18next.t('text.data_deleted_successfully')
                  }
                })
              )
            }
          }
        }
      }
    })
  }
  stateChanged(state) {}
}

customElements.define('mms-inventory-products', InventoryProducts)
