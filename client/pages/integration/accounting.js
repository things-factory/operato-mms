import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class IntegrationAccounting extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'integration accounting'
    }
  }

  render() {
    return html`
      <section>
        <h2>Integration Accounting</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-accounting', IntegrationAccounting)
