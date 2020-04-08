import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class Dashboard extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoSeller: String,
    }
  }

  get context() {
    return {
      title: 'dashboard',
    }
  }

  render() {
    return html`
      <section>
        <h2>Dashboard</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('seller-dashboard', Dashboard)
