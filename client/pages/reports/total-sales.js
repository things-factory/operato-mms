import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class TotalSalesReport extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'reports'
    }
  }

  render() {
    return html`
      <section>
        <h2>Total Sales Report</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-report-total-sales', TotalSalesReport)
