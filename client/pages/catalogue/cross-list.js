import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class CatalogueCrossList extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'catalogue cross list'
    }
  }

  render() {
    return html`
      <section>
        <h2>Catalogue cross list</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-catalogue-cross-list', CatalogueCrossList)
