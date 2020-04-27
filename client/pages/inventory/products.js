import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class InventoryProducts extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'products'
    }
  }

  render() {
    return html`
      <section>
        <h2>Products</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-inventory-products', InventoryProducts)
