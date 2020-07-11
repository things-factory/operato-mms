import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class AddChannelLazada extends connect(store)(PageView) {
  static get properties() {
    return {
      storeName: String,
      countryCode: String
    }
  }

  get context() {
    return {
      title: 'add channel lazada'
    }
  }

  render() {
    return html`
      <h2>Add Channel Lazada - ${this.countryCode}</h2>
      <a href="javascript:history.back()">Go Back</a>

      <input type="text" value=${this.storeName} />

      <a>generate api token</a>
      <button>start integration</button>
    `
  }

  stateChanged(state) {}

  generateAPIToken() {}
}

customElements.define('mms-add-channel-lazada', AddChannelLazada)
