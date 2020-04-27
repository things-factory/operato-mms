import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class InventoryActivities extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'inventory activities'
    }
  }

  render() {
    return html`
      <section>
        <h2>Inventory Activities</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-inventory-activities', InventoryActivities)
