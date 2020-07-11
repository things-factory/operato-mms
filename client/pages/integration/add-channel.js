import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView, navigate } from '@things-factory/shell'

const PLATFORMS = [
  {
    name: 'amazon',
    countryCode: 'India'
  },
  {
    name: 'lazada',
    countryCode: 'Malaysia',
    page: 'mms-add-channel-lazada'
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
            <li @click=${e => this.addChannel(platform)}>
              <div>${platform.name}</div>
              <div>${platform.countryCode}</div>
              <input type="checkbox" />
            </li>
          `
        )}
      </ul>
    `
  }

  stateChanged(state) {}

  addChannel(platform) {
    navigate(platform.page)
  }
}

customElements.define('mms-integration-add-channel', AddChannel)
