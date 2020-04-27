import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class SalesByStoreReport extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'sales by store report'
    }
  }

  render() {
    return html`
      <section>
        <h2>Sales By Store Report</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-report-sales-by-store', SalesByStoreReport)
