import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class Promotions extends connect(store)(PageView) {
  static get properties() {
    return {
      promotionType: String
    }
  }

  get context() {
    return {
      title: 'promotions'
    }
  }

  render() {
    var promotion = this.promotionType || 'ALL'

    return html`
      <section>
        <h2>Promotions - ${promotion}</h2>
      </section>
    `
  }

  async pageUpdated(changes, lifecycle) {
    if (this.active) {
      this.promotionType = lifecycle.resourceId
    }
  }

  stateChanged(state) {}
}

customElements.define('mms-promotion-promotions', Promotions)
