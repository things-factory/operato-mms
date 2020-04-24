import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import { store } from '@things-factory/shell'
import '@material/mwc-icon'

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
          width: 200px;
          height: 100%;
        }

        slot[submenu] {
          flex: 1;
        }
      `
    ]
  }

  render() {
    return html`
      <div>total sales</div>
      <div>total orders</div>
      <div>daily sales average</div>
      <div>total sales by store</div>
      <div>sales by promotion</div>
      <div>current inventory stock value</div>
      <div>top selling products</div>
      <div>generated reports</div>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('submenu-reports', SubmenuReports)
