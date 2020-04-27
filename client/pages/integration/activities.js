import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class IntegrationActivities extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'integration activities'
    }
  }

  render() {
    return html`
      <section>
        <h2>Integration Activities</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-activities', IntegrationActivities)
