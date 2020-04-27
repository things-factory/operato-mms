import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store, navigate } from '@things-factory/shell'
import { appendViewpart, removeViewpart, VIEWPART_POSITION } from '@things-factory/layout-base'

import {
  ICONS_DASHBOARD,
  ICONS_ORDER,
  ICONS_INVENTORY,
  ICONS_CATALOGUE,
  ICONS_REPORTS,
  ICONS_PROMOTIONS,
  ICONS_INTEGRATION
} from '../icons/menu-icons'

const MENUGROUPS = [
  {
    name: 'dashboard',
    defaultPath: 'mms-dashboard',
    icons: ICONS_DASHBOARD
  },
  {
    name: 'order',
    pathPrefix: 'mms-order',
    defaultPath: 'mms-order-stores',
    icons: ICONS_ORDER
  },
  {
    name: 'inventory',
    pathPrefix: 'mms-inventory',
    defaultPath: 'mms-inventory-products',
    icons: ICONS_INVENTORY
  },
  {
    name: 'catalogue',
    pathPrefix: 'mms-catalogue',
    defaultPath: 'mms-catalogue-products',
    icons: ICONS_CATALOGUE
  },
  {
    name: 'reports',
    pathPrefix: 'mms-report',
    defaultPath: 'mms-report-total-sales',
    icons: ICONS_REPORTS
  },
  {
    name: 'promotions',
    pathPrefix: 'mms-promotion',
    defaultPath: 'mms-promotion-promotions',
    icons: ICONS_PROMOTIONS
  },
  {
    name: 'integration',
    pathPrefix: 'mms-integration',
    defaultPath: 'mms-integration-channels',
    icons: ICONS_INTEGRATION
  }
]

import './menu-group-view'

import './menu-group/order'
import './menu-group/catalogue'
import './menu-group/inventory'
import './menu-group/promotions'
import './menu-group/integration'
import './menu-group/reports'

export class MenuTools extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
      width: {
        type: String,
        reflect: true
      }
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

        li {
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

        li[active] {
          opacity: 1;
          color: var(--menu-tools-active-color);
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.15);
          border-left: 2px solid var(--menu-tools-active-color);
        }

        :host([width='NARROW']) li {
          padding: 0px 0px 5px 0px;
          opacity: 0.8;
          color: var(--menu-tools-color);
          border-left: none;
          border-top: 2px solid transparent;
        }

        :host([width='NARROW']) li[active] {
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
      `
    ]
  }

  render() {
    var page = this.page || ''

    return html`
      <ul>
        ${MENUGROUPS.map(
          menu => html`
            <li ?active=${!!~page.indexOf(menu.pathPrefix)} @click=${e => this.onclick(menu)}>
              <img src=${!!~page.indexOf(menu.pathPrefix) ? menu.icons[1] : menu.icons[0]} />
              <div>${menu.name}</div>
            </li>
          `
        )}
      </ul>
    `
  }

  updated(changes) {
    if (changes.has('page')) {
      var menu = MENUGROUPS.find(menu => {
        return !!~this.page.indexOf(menu.pathPrefix)
      })
      if (menu) {
        appendViewpart({
          name: 'mms-menu-group',
          viewpart: {
            show: true,
            template: html`
              <menu-group-view>
                <span slot="title">${menu.name}</span>
                ${this.menuGroup(menu)}
              </menu-group-view>
            `
          },
          position: VIEWPART_POSITION.NAVBAR
        })
      } else {
        removeViewpart('mms-menu-group')
      }
    }
  }

  onclick(menu) {
    var { pathPrefix, defaultPath } = menu

    if (!!~this.page.indexOf(pathPrefix)) {
      // 현재 페이지와 메뉴 그룹이 동일하면, 아무것도 하지 않는다.
    } else {
      navigate(defaultPath)
    }
  }

  menuGroup(menu) {
    var tag = 'menu-group-' + menu.name.toUpperCase()
    var element = document.createElement(tag)
    element.setAttribute('slot', 'menu-group')

    return element
  }

  stateChanged(state) {
    this.page = state.route.page
    this.width = state.layout.width
  }
}

customElements.define('menu-tools', MenuTools)
