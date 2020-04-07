import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import logo from '../../assets/images/hatiolab-logo.png'

class OperatoSellerMain extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoSeller: String
    }
  }
  render() {
    return html`
      <section>
        <h2>OperatoSeller</h2>
        <img src=${logo}></img>
      </section>
    `
  }

  stateChanged(state) {
    this.operatoSeller = state.operatoSeller.state_main
  }
}

window.customElements.define('operato-seller-main', OperatoSellerMain)
