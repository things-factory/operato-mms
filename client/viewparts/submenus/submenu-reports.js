import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

const MENUS = [
  {
    name: 'total sales',
    path: 'mms-reports-total-sales',
    icon: 'storage'
  },
  {
    name: 'total orders',
    path: 'mms-reports-total-orders',
    icon: 'store'
  },
  {
    name: 'daily sales average',
    path: 'mms-reports-daily-sales-average',
    icon: 'shop'
  },
  {
    name: 'total sales by store',
    path: 'mms-reports-total-sales-by-store',
    icon: 'shopping_basket'
  },
  {
    name: 'sales by promotion',
    path: 'mms-reports-sales-by-promotion',
    icon: 'account_box'
  },
  {
    name: 'current inventory stock value',
    path: 'mms-reports-inventory',
    icon: 'local_activity'
  },
  {
    name: 'top selling products',
    path: 'mms-reports-top-selling',
    icon: 'local_activity'
  },
  {
    name: 'generated reports',
    path: 'mms-reports-custom',
    icon: 'local_activity'
  }
]

export class SubmenuReports extends connect(store)(LitElement) {
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
            <li ?active=${page == menu.path}>
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

customElements.define('submenu-reports', SubmenuReports)
