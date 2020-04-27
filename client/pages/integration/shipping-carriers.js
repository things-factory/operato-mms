import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class IntegrationShippingCarriers extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'shipping carriers'
    }
  }

  render() {
    return html`
      <section>
        <h2>Shipping Carriers</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-shipping-carriers', IntegrationShippingCarriers)
