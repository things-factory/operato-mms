import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'

import {
  ICONS_DASHBOARD,
  ICONS_ORDER,
  ICONS_INVENTORY,
  ICONS_CATALOGUE,
  ICONS_REPORTS,
  ICONS_PROMOTIONS,
  ICONS_INTEGRATION,
} from '../icons/menu-icons'

export class MenuTools extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
      width: {
        type: String,
        reflect: true,
      },
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--secondary-color);

          /* for narrow mode */
          flex-direction: column;
          width: 100%;
          --menu-tools-color: rgba(255, 255, 255, 0.9);
          --menu-tools-active-color: rgba(107, 178, 249, 1);
        }

        :host([width='WIDE']) {
          /* for wide mode */
          flex-direction: row;
          width: initial;
          height: 100%;
        }

        ul {
          display: flex;
          flex-direction: row;

          margin: auto;
          padding: 0;
          list-style: none;
          height: 100%;
          overflow: none;
        }

        :host([width='NARROW']) ul {
          width: 100%;
          justify-content: space-around;
        }

        :host([width='WIDE']) ul {
          flex-direction: column;
        }
        :host([width='NARROW']) li {
          flex: 1;
        }

        :host([width='WIDE']) li {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        a {
          display: flex;
          flex-direction: column;
          padding: 5px 0px;
          opacity: 0.7;
          align-items: center;
          text-align: center;
          text-decoration: none;
          text-transform: capitalize;
          color: var(--menu-tools-color);
          border-left: 2px solid transparent;
        }

        a[active] {
          opacity: 1;
          color: var(--menu-tools-active-color);
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.15);
          border-left: 2px solid var(--menu-tools-active-color);
        }

        :host([width='NARROW']) a {
          padding: 0px 0px 5px 0px;
          opacity: 0.8;
          color: var(--menu-tools-color);
          border-left: none;
          border-top: 2px solid transparent;
        }

        :host([width='NARROW']) a[active] {
          opacity: 1;
          color: var(--menu-tools-active-color);
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.15);
          border-left: none;
          border-top: 2px solid var(--menu-tools-active-color);
        }

        img {
          display: block;
          width: 30px;
          padding: 5px 10px 0px 10px;
        }

        :host([width='NARROW']) img {
          padding: 0;
        }

        div {
          font-size: 0.6em;
        }
      `,
    ]
  }

  render() {
    this.menus = [
      {
        name: 'dashboard',
        path: 'mms-dashboard',
        icons: ICONS_DASHBOARD,
      },
      {
        name: 'order',
        path: 'mms-order',
        icons: ICONS_ORDER,
      },
      {
        name: 'inventory',
        path: 'mms-inventory',
        icons: ICONS_INVENTORY,
      },
      {
        name: 'catalogue',
        path: 'mms-catalogue',
        icons: ICONS_CATALOGUE,
      },
      {
        name: 'reports',
        path: 'mms-reports',
        icons: ICONS_REPORTS,
      },
      {
        name: 'promotions',
        path: 'mms-promotions',
        icons: ICONS_PROMOTIONS,
      },
      {
        name: 'integration',
        path: 'mms-integration',
        icons: ICONS_INTEGRATION,
      },
    ]

    var page = this.page || ''

    return html`
      <ul>
        ${this.menus.map(
          (menu) => html`
            <li>
              <a href=${menu.path} ?active=${!!~page.indexOf(menu.path)}>
                <img src=${!!~page.indexOf(menu.path) ? menu.icons[1] : menu.icons[0]} />
                <div>${menu.name}</div>
              </a>
            </li>
          `
        )}
      </ul>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
    this.width = state.layout.width
  }
}

customElements.define('menu-tools', MenuTools)
