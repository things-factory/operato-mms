import '@things-factory/form-ui'
import '@things-factory/grist-ui'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import { html, css } from 'lit-element'
import { i18next, localize } from '@things-factory/i18n-base'
import { MultiColumnFormStyles } from '@things-factory/form-ui'
import { ScrollbarStyles } from '@things-factory/styles'
import { store, PageView, client, CustomAlert } from '@things-factory/shell'

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
        { title: i18next.t('button.save'), action: [] },
        { title: i18next.t('button.delete'), action: [] }
      ]
    }
  }

  async pageInitialized() {
    this.productGristConfig = {}

    this.vasGristConfig = {}
  }

  _getStdDate() {
    let date = new Date()
    date.setDate(date.getDate())
    return date.toISOString().split('T')[0]
  }

  render() {
    return html`
      <form name="arrivalNotice" class="multi-column-form" autocomplete="off">
        <fieldset>
          <legend>${i18next.t('title.arrival_notice')}</legend>
          <label>${i18next.t('label.ref_no')}</label>
          <input name="refNo" />

          <label ?hidden="${!this._ownTransport}">${i18next.t('label.do_no')}</label>
          <input name="deliveryOrderNo" ?hidden="${!this._ownTransport}" />

          <label ?hidden="${!this._ownTransport}">${i18next.t('label.truck_no')}</label>
          <input ?hidden="${!this._ownTransport}" name="truckNo" />

          <label>${i18next.t('label.eta_date')}</label>
          <input name="etaDate" type="date" min="${this._getStdDate()}" required />

          <label ?hidden="${!this._hasContainer}">${i18next.t('label.container_no')}</label>
          <input ?hidden="${!this._hasContainer}" type="text" name="containerNo" />

          <label ?hidden="${!this._hasContainer}">${i18next.t('label.container_size')}</label>
          <select name="containerSize" ?hidden="${!this._hasContainer}">
            <option value="">--${i18next.t('label.please_select_a_container_size')}--</option>
            ${(this.containerSizes || []).map(
              containerSize =>
                html`
                  <option value="${containerSize && containerSize.name}">${containerSize && containerSize.name}</option>
                `
            )}
          </select>

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
            id="container"
            type="checkbox"
            name="container"
            ?checked="${this._hasContainer}"
            @change="${e => {
              this._hasContainer = e.currentTarget.checked
            }}"
          />
          <label for="container">${i18next.t('label.container')}</label>

          <input id="looseItem" type="checkbox" name="looseItem" ?checked="${this._looseItem}" />
          <label for="looseItem">${i18next.t('label.loose_item')}</label>

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

          <input
            id="ownTransport"
            type="checkbox"
            name="ownTransport"
            ?checked="${this._ownTransport}"
            @change="${e => (this._ownTransport = e.currentTarget.checked)}"
            ?hidden="${this._importedOrder}"
          />
          <label for="ownTransport" ?hidden="${this._importedOrder}">${i18next.t('label.own_transport')}</label>
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

  _validateForm() {}

  _validateProducts() {}

  _validateVas() {}

  _getFormInfo() {
    const formData = this._serializeForm(this.arrivalNoticeForm)
    delete formData.importedOrder
    return formData
  }

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

customElements.define('mms-create-stock-replenishment', CreateStockReplenishment)
