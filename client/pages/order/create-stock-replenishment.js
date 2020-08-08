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
class CreateStockReplenishment extends connect(store)(PageView) {
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
      title: i18next.t('title.create_stock_replenishment'),
      actions: [
        { title: i18next.t('button.save'), action: [] },
        { title: i18next.t('button.delete'), action: [] }
      ]
    }
  }

  render() {
    return html`
    `
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

  stateChanged(state) {}
}

customElements.define('mms-create-stock-replenishment', CreateStockReplenishment)
