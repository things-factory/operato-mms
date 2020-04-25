import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class IntegrationOfflineStore extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'integration offline stores'
    }
  }

  render() {
    return html`
      <section>
        <h2>Integration Offline Stores</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-offline-stores', IntegrationOfflineStore)
