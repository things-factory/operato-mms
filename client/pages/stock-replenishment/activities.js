import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class StockReplenishmentActivities extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'order activities'
    }
  }

  render() {
    return html`
      <section>
        <h2>Stock Replenishment Activities</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-stock-replenishment-activities', StockReplenishmentActivities)
