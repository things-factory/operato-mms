import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView, client, CustomAlert } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import { openPopup } from '@things-factory/layout-base'
import gql from 'graphql-tag'
import { getCodeByName } from '@things-factory/code-base'
import { ScrollbarStyles } from '@things-factory/styles'
import './create-new-promotion'

class Promotions extends connect(store)(PageView) {
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
      title: i18next.t('title.promotions'),
      actions: [
        { title: i18next.t('button.create_new'), action: () => {this._createNewPromotionPopup()} },
        { title: i18next.t('button.delete'), action: [] }
      ],
      exportable: {
        name: i18next.t('title.promotions'),
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
        .fetchHandler=""
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
          name: 'storeName',
          header: i18next.t('field.store_name'),
          sortable: true,
          imex: { header: i18next.t('field.store_name'), key: 'storeName', width: 25, type: 'string' },
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
          imex: { header: i18next.t('field.type'), key: 'type', width: 25, type: 'integer' },
          record: {
            editable: true,
            align: 'center'
          },
          width: 100
        },
        {
          type: 'string',
          name: 'criteria',
          header: i18next.t('field.criteria'),
          imex: { header: i18next.t('field.criteria'), key: 'criteria', width: 25, type: 'integer' },
          record: { align: 'left' },
          sortable: true,
          width: 100
        },
        {
          type: 'datetime',
          name: 'startingOn',
          header: i18next.t('field.started_on'),
          imex: { header: i18next.t('field.started_on'), key: 'startingOn', width: 25, type: 'datetime' },
          record: { align: 'center' },
          sortable: true,
          width: 100
        },
        {
          type: 'datetime',
          name: 'endingOn',
          header: i18next.t('field.ending_on'),
          imex: { header: i18next.t('field.ending_on'), key: 'endingOn', width: 25, type: 'datetime' },
          record: { align: 'center' },
          sortable: true,
          width: 100
        },
        {
          type: 'string',
          name: 'status',
          header: i18next.t('field.status'),
          imex: { header: i18next.t('field.status'), key: 'status', width: 25, type: 'integer' },
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

  _createNewPromotionPopup(bizplaceId, bizplaceName) {
    openPopup(
      html`
        <create-new-promotion></create-new-promotion>
      `,
      {
        backdrop: true,
        size: 'large',
        title: i18next.t('title.create_new_promotion')
      }
    )
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

customElements.define('mms-promotion-promotions', Promotions)
