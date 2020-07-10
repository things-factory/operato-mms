import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

const PLATFORMS = [
  {
    name: 'amazon',
    countryCode: 'India'
  },
  {
    name: 'lazada',
    countryCode: ''
  }
]

class AddChannel extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'add channel'
    }
  }

  render() {
    return html`
      <h2>Add Channel</h2>
      <a href="javascript:history.back()">Go Back</a>

      <ul>
        ${PLATFORMS.map(
          platform => html`
            <div>${platform.name}</div>
            <div>${platform.countryCode}</div>
            <input type="checkbox" />
          `
        )}
      </ul>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-add-channel', AddChannel)
