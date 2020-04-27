import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class PromotionActivities extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'promotion activities'
    }
  }

  render() {
    return html`
      <section>
        <h2>Promotion Activities</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-promotion-activities', PromotionActivities)
