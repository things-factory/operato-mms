import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class IntegrationWareo extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'wareo integration'
    }
  }

  render() {
    return html`
      <section>
        <h2>Wareo Integration</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-wareo', IntegrationWareo)
