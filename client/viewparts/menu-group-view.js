import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

export class MenuGroupView extends connect(store)(LitElement) {
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

        div[title] {
          position: relative;
          background-color: white;
        }

        div[title] mwc-icon {
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: 1em;
          border-radius: 50%;
          border: 2px solid #73ad21;
        }

        slot[menu-group] {
          flex: 1;
        }
      `
    ]
  }

  render() {
    return html`
      <div title>
        <slot name="title"></slot>
        <mwc-icon>keyboard_arrow_left</mwc-icon>
      </div>
      <slot name="menu-group"> </slot>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('menu-group-view', MenuGroupView)
