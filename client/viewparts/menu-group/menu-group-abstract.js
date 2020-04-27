import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

export class MenuGroupAbstract extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
      resourceId: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;

          flex-direction: column;
          height: 100%;
        }

        ul {
          list-style: none;
          padding: 4px;
        }

        li {
          margin: 10px 0;
          color: black;
        }

        li[active] {
          opacity: 1;
          color: tomato;
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.15);
        }

        a {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
      `
    ]
  }

  renderMenus(menus, fullPath) {
    if (!menus || menus.length == 0) {
      return
    }

    return html`
      <ul>
        ${menus.map(
          menu => html`
            <li ?active=${menu.path == fullPath}>
              <a href=${menu.path}>
                <mwc-icon>${menu.icon}</mwc-icon>
                ${menu.name}
              </a>
              ${menu.menus ? this.renderMenus(menu.menus, fullPath) : html``}
            </li>
          `
        )}
      </ul>
    `
  }

  render() {
    var fullPath = this.resourceId ? `${this.page}/${this.resourceId}` : this.page
    return this.renderMenus(this.getMenus(), fullPath)
  }

  getMenus() {}

  stateChanged(state) {
    this.page = state.route.page
    this.resourceId = state.route.resourceId
  }
}
