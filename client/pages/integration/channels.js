import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class IntegrationChannels extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'integration channels'
    }
  }

  render() {
    return html`
      <section>
        <h2>Integration Channels</h2>
        <a href="mms-integration-add-channel">add channel</a>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-channels', IntegrationChannels)
