import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class InventoryReport extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'Inventory Report'
    }
  }

  render() {
    return html`
      <section>
        <h2>Inventory Report</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-report-inventory', InventoryReport)
