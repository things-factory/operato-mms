import { css, html, LitElement } from 'lit-element'
import { i18next, localize } from '@things-factory/i18n-base'

import '../components/wizard-view'

import './basic-product-setting'
import './product-variation-setting'
import './product-marketplace-setting'

class CreateNewProdutPopup extends localize(i18next)(LitElement) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
          background-color: white;
        }
        wizard-view {
          flex: 2;
          padding: var(--wizard-padding, 15px);
        }
      `
    ]
  }

  render() {
    return html`
      <wizard-view @change=${e => (this.current = e.detail.active?.getAttribute('name'))}>
        <basic-product-setting name="basic-product-setting"></basic-product-setting>
        <product-variation-setting name="product-variation-setting"></product-variation-setting>
        <product-marketplace-setting
          name="product-marketplace-setting"
          .done=${() => this.done()}
        ></product-marketplace-setting>
      </wizard-view>
    `
  }

  done() {
    this.renderRoot.querySelector('wizard-view').gotoStep(1)
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

window.customElements.define('create-new-product-popup', CreateNewProdutPopup)
