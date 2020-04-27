import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class OrderStores extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'order for stores'
    }
  }

  render() {
    return html`
      <section>
        <h2>Order Stores</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-order-stores', OrderStores)
