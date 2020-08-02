import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class Inventory extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'inventory'
    }
  }

  render() {
    return html`
      <section>
        <h2>Inventories</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-inventory', Inventory)
