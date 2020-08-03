import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { openPopup } from '@things-factory/layout-base'
import { client, CustomAlert, PageView } from '@things-factory/shell'
import { ScrollbarStyles } from '@things-factory/styles'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import gql from 'graphql-tag'
import { css, html } from 'lit-element'
import './create-new-product-popup'
import './product-details'

class Products extends localize(i18next)(PageView) {
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
        // { title: i18next.t('button.save'), action: this._saveMarketplaceProduct.bind(this) },
        // { title: i18next.t('button.delete'), action: this._deleteMarketplaceProduct.bind(this) },
        { title: i18next.t('button.add'), action: this._createNewProduct.bind(this) }
      ],
      exportable: {
        name: i18next.t('title.products'),
        data: this._exportableData.bind(this)
      }
    }
  }

  render() {
    return html`
      <search-form id="search-form" .fields=${this._searchFields} @submit=${e => this.dataGrist.fetch()}></search-form>
      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler="${this._fetchProducts.bind(this)}"
      >
      </data-grist>
    `
  }
  async pageInitialized() {
    this._searchFields = [
      {
        label: i18next.t('field.name'),
        name: 'name',
        type: 'text',
        props: { searchOper: 'i_like' }
      }
    ]

    this.config = {
      rows: { selectable: { multiple: true }, appendable: false },
      columns: [
        { type: 'gutter', gutterName: 'sequence' },
        { type: 'gutter', gutterName: 'row-selector', multiple: true },
        {
          type: 'gutter',
          gutterName: 'button',
          icon: 'details',
          handlers: {
            click: this._showProductInfo.bind(this)
          }
        },
        {
          type: 'string',
          name: 'sku',
          header: i18next.t('field.isku'),
          imex: { header: i18next.t('field.isku'), key: 'sku', width: 25, type: 'string' },
          record: { editable: true, align: 'center' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          sortable: true,
          imex: { header: i18next.t('field.name'), key: 'name', width: 25, type: 'string' },
          record: {
            editable: true,
            align: 'center'
          },
          width: 180
        },
        {
          type: 'string',
          name: 'type',
          header: i18next.t('field.type'),
          sortable: true,
          imex: { header: i18next.t('field.type'), key: 'type', width: 25, type: 'string' },
          record: {
            editable: true,
            align: 'center'
          },
          width: 100
        },
        {
          type: 'string',
          name: 'status',
          header: i18next.t('field.status'),
          imex: { header: i18next.t('field.status'), key: 'status', width: 80, type: 'string' },
          record: { align: 'center' },
          sortable: true,
          width: 100
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.last_updated'),
          imex: { header: i18next.t('field.last_updated'), key: 'updatedAt', width: 25, type: 'datetime' },
          record: { align: 'center' },
          sortable: true,
          width: 180
        }
      ]
    }

    await this.updateComplete

    this.dataGrist.fetch()
  }
  async pageUpdated(changes, lifecycle) {
    if (this.active) {
      await this.updateComplete
      this.dataGrist.fetch()
    }
  }
  get searchForm() {
    return this.shadowRoot.querySelector('search-form')
  }

  get dataGrist() {
    return this.shadowRoot.querySelector('data-grist')
  }

  get _columns() {
    return this.config.columns
  }
  async _fetchProducts({ page, limit, sorters = [] }) {
    const response = await client.query({
      query: gql`
      query {
        marketplaceProducts(${gqlBuilder.buildArgs({
          filters: this.searchForm.queryFilters,
          pagination: { page, limit },
          sortings: sorters
        })}) {
          items {
            id
            name
            sku
            itemId
            marketplaceProductVariations {
              sku
            }
            hasVariation
            costPrice
            sellPrice
            weight
            categoryId
            packageLength
            packageWidth
            packageHeight
            afterTaxCostPrice
            afterTaxSalesPrice
            condition
            status
            updatedAt
            createdAt
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
            const response = await client.mutate({
              mutation: gql`
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
  _showProductInfo(columns, data, column, record, rowIndex) {
    openPopup(html`<product-detail .productId="${record.id}"></product-detail>`, {
      backdrop: true,
      size: 'large',
      title: `${record.name}` + ` ( ${record.itemSku} )`
    })
  }
  _createNewProduct() {
    openPopup(
      html`
        <create-new-product-popup
          @completed="${() => {
            this._fetchProducts()
          }}"
        ></create-new-product-popup>
      `,
      {
        backdrop: true,
        size: 'large',
        title: i18next.t('title.create_new_product')
      }
    )
  }
  async _exportableData() {
    try {
      let records = []
      let data = []

      var headerSetting = [
        ...this.dataGrist._config.columns
          .filter(column => column.type !== 'gutter' && column.record !== undefined && column.imex !== undefined)
          .map(column => {
            return column.imex
          })
      ]

      if (this.dataGrist.selected && this.dataGrist.selected.length > 0) {
        records = this.dataGrist.selected
        data = records
      } else {
        const bizplaceFilters = (await this.searchForm.getQueryFilters()).filter(x => x.name === 'bizplaceId')
        if (bizplaceFilters.length == 0) {
          throw new Error(`Please select a customer for export.`)
        }
        data = await this.fetchInventoriesForExport()
      }

      data = data.map(item => {
        return {
          id: item.id,
          ...this._columns
            .filter(column => column.type !== 'gutter' && column.record !== undefined && column.imex !== undefined)
            .reduce((record, column) => {
              record[column.imex.key] = column.imex.key
                .split('.')
                .reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), item)
              return record
            }, {})
        }
      })

      return { header: headerSetting, data: data }
    } catch (e) {
      this._showToast(e)
    }
  }
  stateChanged(state) {}
}

customElements.define('mms-catalogue-products', Products)
