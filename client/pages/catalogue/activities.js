import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import '../components/category-selector'

class CatalogueActivities extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;

          background-color: #fff;
        }

        category-selector {
          flex: 1;
        }
      `
    ]
  }

  get context() {
    return {
      title: 'catalogue activities'
    }
  }

  render() {
    return html`
      <h2>Catalogue Activities</h2>
      <category-selector></category-selector>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-catalogue-activities', CatalogueActivities)
