import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class OrderByStore extends connect(store)(PageView) {
  static get properties() {
    return {
      store: String
    }
  }

  get context() {
    return {
      title: 'order by store'
    }
  }

  render() {
    return html`
      <section>
        <h2>Order by Store - ${this.store || 'ALL'}</h2>
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

customElements.define('mms-order-by-store', OrderByStore)
