import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class CatalogueActivities extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'catalogue activities'
    }
  }

  render() {
    return html`
      <section>
        <h2>Catalogue Activities</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-catalogue-activities', CatalogueActivities)
