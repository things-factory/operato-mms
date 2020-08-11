import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { getCodeByName } from '@things-factory/code-base'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import { html, css } from 'lit-element'
import { i18next, localize } from '@things-factory/i18n-base'
import { MultiColumnFormStyles } from '@things-factory/form-ui'
import { ScrollbarStyles } from '@things-factory/styles'
import { store, PageView, client, CustomAlert } from '@things-factory/shell'
import gql from 'graphql-tag'

class CreateStockReplenishment extends connect(store)(PageView) {
  static get styles() {
    return [
      MultiColumnFormStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .container {
          flex: 1;
          display: flex;
          overflow: hidden;
          min-height: 50vh;
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
        h2 {
          padding: var(--subtitle-padding);
          font: var(--subtitle-font);
          color: var(--subtitle-text-color);
          border-bottom: var(--subtitle-border-bottom);
        }
        .grist h2 {
          margin: var(--grist-title-margin);
          border: var(--grist-title-border);
          color: var(--secondary-color);
        }

        .grist h2 mwc-icon {
          vertical-align: middle;
          margin: var(--grist-title-icon-margin);
          font-size: var(--grist-title-icon-size);
          color: var(--grist-title-icon-color);
        }

        h2 + data-grist {
          padding-top: var(--grist-title-with-grid-padding);
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
      title: i18next.t('title.create_stock_replenishment'),
      actions: [
        { title: i18next.t('button.submit'), action: this._generateStockReplenishment.bind(this) },
        { title: i18next.t('button.clear_form'), action: [] }
      ]
    }
  }

  async pageInitialized() {
    this.productGristConfig = {
      pagination: { infinite: true },
      list: { fields: ['batch_no', 'product', 'packingType', 'totalWeight'] },
      columns: [
        { type: 'gutter', gutterName: 'sequence' },
        {
          type: 'gutter',
          gutterName: 'button',
          icon: 'close',
          handlers: {
            click: (columns, data, column, record, rowIndex) => {
              this.productData = {
                ...this.productData,
                records: data.records.filter((_, idx) => idx !== rowIndex)
              }
              this._updateVasTargets()
            }
          }
        },
        {
          type: 'string',
          name: 'batchId',
          header: i18next.t('field.batch_no'),
          record: { editable: true, align: 'center' },
          width: 150
        },
        {
          type: 'object',
          name: 'product',
          header: i18next.t('field.product'),
          record: {
            editable: true,
            align: 'center',
            options: {
              queryName: 'marketplaceProducts',
              nameField: 'name',
              descriptionField: 'description',
              list: { fields: ['name', 'description'] }
            }
          },
          width: 350
        },
        {
          type: 'code',
          name: 'packingType',
          header: i18next.t('field.packing_type'),
          record: {
            editable: true,
            align: 'center',
            codeName: 'PACKING_TYPES'
          },
          width: 150
        },
        {
          type: 'integer',
          name: 'packQty',
          header: i18next.t('field.pack_qty'),
          record: { editable: true, align: 'center', options: { min: 0 } },
          width: 80
        },
        {
          type: 'float',
          name: 'weight',
          header: i18next.t('field.pack_weight'),
          record: { editable: true, align: 'center', options: { min: 0 } },
          width: 100
        },
        {
          type: 'code',
          name: 'unit',
          header: i18next.t('field.unit'),
          record: { editable: true, align: 'center', codeName: 'WEIGHT_UNITS' },
          width: 80
        },
        {
          type: 'float',
          name: 'totalWeight',
          header: i18next.t('field.total_weight'),
          record: { align: 'center' },
          width: 120
        }
      ]
    }

    this.vasGristConfig = {}
  }

  render() {
    return html`
      <form name="stockReplenishment" class="multi-column-form" autocomplete="off">
        <fieldset>
          <legend>${i18next.t('title.stock_replenishment')}</legend>
          <label>${i18next.t('label.ref_no')}</label>
          <input name="refNo" />

          <label>${i18next.t('label.eta_date')}</label>
          <input name="etaDate" type="date" min="${this._getStdDate()}" required />

          <label>${i18next.t('label.upload_documents')}</label>
          <file-uploader
            name="attachments"
            id="uploadDocument"
            label="${i18next.t('label.select_file')}"
            accept="*"
            multiple="true"
            custom-input
          ></file-uploader>

          <input
            id="importedOrder"
            type="checkbox"
            name="importCargo"
            ?checked="${this._importedOrder}"
            @change="${e => {
              this._importedOrder = e.currentTarget.checked
              if (this._importedOrder) {
                this._ownTransportInput.checked = true
                this._ownTransport = true
              }
            }}"
          />
          <label for="importedOrder">${i18next.t('label.import_cargo')}</label>

        </fieldset>
      </form>

      <div class="container">
        <div class="grist">
          <h2><mwc-icon>list_alt</mwc-icon>${i18next.t('title.product')}</h2>

          <data-grist
            id="product-grist"
            .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
            .config=${this.productGristConfig}
            .data="${this.productData}"
            @record-change=""
          ></data-grist>

          <h2><mwc-icon>list_alt</mwc-icon>${i18next.t('title.vas')}</h2>

          <data-grist
            id="vas-grist"
            .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
            .config=${this.vasGristConfig}
            .data="${this.vasData}"
          ></data-grist>
        </div>
      </div>
    `
  }

  constructor() {
    super()
    this.productData = { records: [] }
    this.vasData = { records: [] }
    this._importedOrder = false
  }

  get stockReplenishmentForm() {
    return this.shadowRoot.querySelector('form[name=stockReplenishment]')
  }

  get productGrist() {
    return this.shadowRoot.querySelector('data-grist#product-grist')
  }

  get vasGrist() {
    return this.shadowRoot.querySelector('data-grist#vas-grist')
  }

  get _document() {
    return this.shadowRoot.querySelector('#uploadDocument')
  }

  _getStdDate() {
    let date = new Date()
    date.setDate(date.getDate())
    return date.toISOString().split('T')[0]
  }

  _getFormInfo() {
    const formData = this._serializeForm(this.stockReplenishmentForm)
    return formData
  }

  _getOrderProducts() {
    return this.productGrist.dirtyData.records.map(record => {
      let orderProduct = {
        batchId: record.batchId,
        product: { id: record.product.id },
        packingType: record.packingType,
        weight: record.weight,
        unit: record.unit,
        packQty: record.packQty,
        totalWeight: record.totalWeight
      }
      
      return orderProduct
    })
  }

  async _generateStockReplenishment() {
    try {
      this._validateForm()
      this._validateProducts()
      this._validateVas()

      const result = await CustomAlert({
        title: i18next.t('title.are_you_sure'),
        text: i18next.t('text.submit_stock_replenishment'),
        confirmButton: { text: i18next.t('button.confirm') },
        cancelButton: { text: i18next.t('button.cancel') }
      })

      if (!result.value) return

      let stockReplenishment = this._getFormInfo()
      let attachments = this._document.files || null
      stockReplenishment.orderProduct = this._getOrderProducts()

      const response = await client.query({
        query: gql`
            mutation ($attachments: Upload) {
              generateStockReplenishment(${gqlBuilder.buildArgs(stockReplenishment)}, file:$attachments) {
                id
                name
              }
            }
          `,
        variables: {
          attachments
        },
        context: {
          hasUpload: true
        }
      })


    } catch (error) {
      this._showToast(error)
    }
  }

  _updateVasTargets() {}

  _validateForm() {
    if (!this.stockReplenishmentForm.checkValidity()) throw new Error(i18next.t('text.stock_replenishment_form_invalid'))
  }

  _validateProducts() {}

  _validateVas() {}

  _serializeForm(form) {
    let obj = {}
    Array.from(form.querySelectorAll('input, select')).forEach(field => {
      if (!field.hasAttribute('hidden') && field.value) {
        obj[field.name] = field.type === 'checkbox' ? field.checked : field.value
      }
    })

    return obj
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

customElements.define('mms-stock-replenishment-create', CreateStockReplenishment)
