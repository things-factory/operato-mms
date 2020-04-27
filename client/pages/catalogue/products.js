import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class CatalogueProducts extends connect(store)(PageView) {
  static get properties() {
    return {
      store: String
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
        <h2>Catalogue - ${this.store || 'ALL'}</h2>
      </section>
    `
  }

  async pageUpdated(changes, lifecycle) {
    if (this.active) {
      this.store = lifecycle.resourceId
    }
  }

  stateChanged(state) {}
}

customElements.define('mms-catalogue-products', CatalogueProducts)
