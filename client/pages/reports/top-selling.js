import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class TopSellingReport extends connect(store)(PageView) {
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
        <h2>Top Selling Report</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-report-top-selling', TopSellingReport)
