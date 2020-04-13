import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class Promotions extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'promotions'
    }
  }

  render() {
    return html`
      <section>
        <h2>Promotions</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-promotions', Promotions)
