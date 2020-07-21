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
    pathPrefix: 'mms-dashboard',
    defaultPath: 'mms-dashboard',
    icons: ICONS_DASHBOARD
  },
  {
    name: 'order',
    pathPrefix: 'mms-order',
    defaultPath: 'mms-order-by-store',
    menuGroupTag: 'menu-group-order',
    icons: ICONS_ORDER
  },
  {
    name: 'inventory',
    pathPrefix: 'mms-inventory',
    defaultPath: 'mms-inventory-products',
    menuGroupTag: 'menu-group-inventory',
    icons: ICONS_INVENTORY
  },
  {
    name: 'catalogue',
    pathPrefix: 'mms-catalogue',
    defaultPath: 'mms-catalogue-products',
    menuGroupTag: 'menu-group-catalogue',
    icons: ICONS_CATALOGUE
  },
  {
    name: 'reports',
    pathPrefix: 'mms-report',
    defaultPath: 'mms-report-total-sales',
    menuGroupTag: 'menu-group-reports',
    icons: ICONS_REPORTS
  },
  {
    name: 'promotions',
    pathPrefix: 'mms-promotion',
    defaultPath: 'mms-promotion-promotions',
    menuGroupTag: 'menu-group-promotions',
    icons: ICONS_PROMOTIONS
  },
  {
    name: 'integration',
    pathPrefix: ['marketplace-store', 'mms-integration'],
    defaultPath: 'marketplace-stores',
    menuGroupTag: 'menu-group-integration',
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

function hasGroup(page, prefix) {
  if (Array.isArray(prefix)) {
    return !!prefix.find(p => !!~page.indexOf(p))
  }

  return !!~page.indexOf(prefix)
}

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
          --menu-tools-active-color: #28b0b8;
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
          position: relative;
          padding: 9px 0px;
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
          background-color: rgba(0, 0, 0, 0.2);
          border-left: 2px solid var(--menu-tools-active-color);
        }
        li[active]::after {
          content: '';
          position: absolute;
          margin-top: 30%;
          right: 0;
          width: 0;
          height: 0;
          border-top: 7px solid transparent;
          border-right: 7px solid #fff;
          border-bottom: 7px solid transparent;
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
          padding: 5px 10px 5px 10px;
        }

        :host([width='NARROW']) img {
          padding: 8px 0;
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
            <li ?active=${hasGroup(page, menu.pathPrefix)} @click=${e => this.onclick(menu)}>
              <img src=${hasGroup(page, menu.pathPrefix) ? menu.icons[1] : menu.icons[0]} />
            </li>
          `
        )}
      </ul>
    `
  }

  updated(changes) {
    if (changes.has('page')) {
      var menu = MENUGROUPS.find(menu => {
        return hasGroup(this.page, menu.pathPrefix)
      })
      if (menu?.menuGroupTag) {
        appendViewpart({
          name: 'mms-menu-group',
          viewpart: {
            show: true,
            /* NARROW 모드에서는 hovering 되도록 하자. */
            // hovering: 'edge',
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

    if (hasGroup(this.page, pathPrefix)) {
      // 현재 페이지와 메뉴 그룹이 동일하면, 아무것도 하지 않는다.
    } else {
      navigate(defaultPath)
    }
  }

  menuGroup(menu) {
    var tag = menu.menuGroupTag
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
