import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class CatalogueProducts extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'catalogue'
    }
  }

  render() {
    return html`
      <section>
        <h2>Catalogue</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-catalogue-products', CatalogueProducts)
