import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

export class MenuGroupView extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
      collapsed: {
        type: Boolean,
        reflect: true
      }
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;
          background-color: white;

          flex-direction: column;
          width: 200px;
          height: 100%;
          border-right: var(--border-dark-color);
        }

        :host([collapsed]) {
          width: 24px;
        }

        :host([collapsed]) div,
        :host([collapsed]) slot {
          display: none;
        }

        div[title] {
          display: block;
          padding: 12px 10px 7px 10px;
          background-color: white;
          color: var(--secondary-text-color);
          font: var(--header-bar-title);
          text-transform: capitalize;
        }

        mwc-icon {
          position: absolute;
          right: 9px;
          top: 11px;
          font-size: 1em;
          border-radius: 50%;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          opacity: 0.7;
          cursor: pointer;
        }
        mwc-icon:hover {
          opacity: 1;
          background-color: var(--primary-color);
          color: #fff;
        }

        slot[menu-group] {
          flex: 1;
        }
      `
    ]
  }

  render() {
    var icon = this.collapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'

    return html`
      <div title>
        <slot name="title"></slot>
      </div>
      <mwc-icon @click=${e => this.onclick(e)}>${icon}</mwc-icon>
      <slot name="menu-group"> </slot>
    `
  }

  onclick(e) {
    this.collapsed = !this.collapsed
    // this.toggleAttribute('collapsed')
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('menu-group-view', MenuGroupView)
