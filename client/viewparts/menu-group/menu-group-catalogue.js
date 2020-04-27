import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

const MENUS = [
  {
    name: 'products',
    path: 'mms-catalogue-products',
    icon: 'storage'
  },
  {
    name: 'bulk activities',
    path: 'mms-catalogue-activities',
    icon: 'local_activity'
  },
  {
    name: 'cross list',
    path: 'mms-catalogue-cross-list',
    icon: 'local_activity'
  }
]

export class MenuGroupCatalogue extends connect(store)(LitElement) {
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

  render() {
    var page = this.page

    return html`
      <ul>
        ${MENUS.map(
          menu => html`
            <li ?active=${!!~page.indexOf(menu.path)}>
              <a href=${menu.path}>
                <mwc-icon>${menu.icon}</mwc-icon>
                ${menu.name}
              </a>
            </li>
          `
        )}
      </ul>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('menu-group-catalogue', MenuGroupCatalogue)
