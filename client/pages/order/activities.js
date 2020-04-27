import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class OrderActivities extends connect(store)(PageView) {
  static get properties() {
    return {
      operatoMMS: String
    }
  }

  get context() {
    return {
      title: 'order activities'
    }
  }

  render() {
    return html`
      <section>
        <h2>Order Activities</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-order-activities', OrderActivities)
