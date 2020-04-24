import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

export class SubmenuPart extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;

          flex-direction: column;
          width: initial;
          height: 100%;
        }

        div[title] {
          position: relative;
          background-color: white;
        }

        div[title] mwc-icon {
          position: absolute;
          right: 0;
          border-radius: 50%;
          border: 2px solid #73ad21;
        }

        div[submenu] {
          flex: 1;
        }
      `,
    ]
  }

  render() {
    return html`
      <div title>
        <span>TITLE</span>
        <mwc-icon>keyboard_arrow_left</mwc-icon>
      </div>
      <div submenu></div>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('submenu-part', SubmenuPart)
