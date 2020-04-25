import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

export class SubmenuInventory extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;

          flex-direction: column;
          width: 200px;
          height: 100%;
        }

        slot[submenu] {
          flex: 1;
        }
      `
    ]
  }

  render() {
    return html`
      <div>All products</div>
      <div>Bulk activities</div>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('submenu-inventory', SubmenuInventory)
