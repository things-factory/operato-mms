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
          margin: 0;
          padding: 0;
        }
        a {
          display: flex;
          align-items: center;
          border-bottom: var(--border-dark-color);
          padding: 9px 0 7px 10px;
          text-decoration: none;
          font: normal 14px var(--theme-font);
          color: var(--secondary-color);
          text-transform: capitalize;
        }
        a mwc-icon {
          margin-right: 4px;
          font-size: 13px;
          color: var(--primary-color);
        }
        li[active] a {
          border-bottom: 1px solid var(--primary-color);
          font-weight: bold;
          color: var(--primary-color);
        }
        li li a,
        li[active] li a {
          background-color: #f4f4f4;
          border-bottom: var(--border-dark-color);
          padding: 7px 0 7px 20px;
          font: normal 13px var(--theme-font);
          color: var(--secondary-color);
        }
        li li[active] a {
          background-color: rgba(var(--primary-color-rgb), 0.15);
          font: bold 13px var(--theme-font);
          color: var(--primary-color);
        }
        li li a::before {
          content: '-';
          margin-right: 4px;
        }
        li li a mwc-icon {
          display: none;
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
