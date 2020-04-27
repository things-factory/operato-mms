import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class DailySalesAverageReport extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'daily sales average report'
    }
  }

  render() {
    return html`
      <section>
        <h2>Daily Sales Average Report</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-report-daily-sales-average', DailySalesAverageReport)
