import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class Order extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'order'
    }
  }

  render() {
    return html`
      <section>
        <h2>Order</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-order', Order)
