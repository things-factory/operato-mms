import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class Integration extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'integration'
    }
  }

  render() {
    return html`
      <section>
        <h2>Integration</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration', Integration)
