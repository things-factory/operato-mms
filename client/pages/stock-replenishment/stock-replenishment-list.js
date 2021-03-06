import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { getCodeByName } from '@things-factory/code-base'
import { html, css } from 'lit-element'
import { i18next } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { store, PageView  } from '@things-factory/shell'

class StockReplenishmentList extends connect(store)(PageView) {
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
      title: i18next.t('title.stock_replenishment_list'),
      actions: [
        { title: i18next.t('button.save'), action: [] },
        { title: i18next.t('button.delete'), action: [] }
      ]
    }
  }

  render() {
    return html`
      <search-form id="search-form" .fields=${this._searchFields} @submit=${e => this.dataGrist.fetch()}></search-form>
      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler=""
      >
      </data-grist>
    `
  }

  async pageInitialized() {
    const _orderStatus = await getCodeByName('ORDER_STATUS')
    this._searchFields = [
      {
        label: i18next.t('field.order_no'),
        name: 'orderNo',
        type: 'text',
        props: { searchOper: 'i_like' }
      },
      {
        label: i18next.t('field.ref_no'),
        name: 'refNo',
        type: 'text',
        props: { searchOper: 'i_like' }
      },
      {
        label: i18next.t('field.eta_date'),
        name: 'etaDate',
        type: 'date',
        props: { searchOper: 'eq' }
      },
      {
        label: i18next.t('field.status'),
        name: 'status',
        type: 'select',
        options: [
          { value: '' },
          ..._orderStatus.map(status => {
            return {
              name: i18next.t(`label.${status.description}`),
              value: status.name
            }
          })
        ],
        props: { searchOper: 'eq' }
      },
      {
        label: i18next.t('field.import_cargo'),
        name: 'importCargo',
        type: 'checkbox',
        props: { searchOper: 'eq' },
        attrs: ['indeterminate']
      }
    ]

    this.config = {
      rows: { selectable: { multiple: true }, appendable: false },
      columns: [
        { type: 'gutter', gutterName: 'dirty' },
        { type: 'gutter', gutterName: 'sequence' },
        { type: 'gutter', gutterName: 'row-selector', multiple: true },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          imex: { header: i18next.t('field.name'), key: 'name', width: 25, type: 'string' },
          record: { editable: true, align: 'center' },
          sortable: true,
          width: 200
        },
        {
          type: 'string',
          name: 'refNo',
          header: i18next.t('field.ref_no'),
          sortable: true,
          imex: { header: i18next.t('field.ref_no'), key: 'refNo', width: 25, type: 'string' },
          record: {
            editable: true,
            align: 'center'
          },
          width: 180
        },
        {
          type: 'date',
          name: 'eta',
          header: i18next.t('field.eta_date'),
          imex: { header: i18next.t('field.eta_date'), key: 'eta', width: 25, type: 'string' },
          record: { align: 'left' },
          sortable: true,
          width: 100
        },
        {
          type: 'string',
          name: 'importCargo',
          header: i18next.t('field.import_cargo'),
          imex: { header: i18next.t('field.import_cargo'), key: 'importCargo', width: 25, type: 'string' },
          record: { align: 'center' },
          sortable: true,
          width: 180
        },
        {
          type: 'string',
          name: 'status',
          header: i18next.t('field.status'),
          imex: { header: i18next.t('field.status'), key: 'status', width: 25, type: 'string' },
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
        },
        {
          type: 'datetime',
          name: 'updater',
          header: i18next.t('field.updater'),
          imex: { header: i18next.t('field.updater'), key: 'updater', width: 25, type: 'datetime' },
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

customElements.define('mms-stock-replenishment-list', StockReplenishmentList)
