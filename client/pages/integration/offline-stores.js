import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'
import '../components/varient-options-editor'

const TYPES = ['Color', 'Size', 'Weight']

class IntegrationOfflineStore extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  get context() {
    return {
      title: 'integration offline stores',
      options: Array
    }
  }

  render() {
    const options = this.options || [
      {
        type: 'Color',
        options: ['Blue', 'Red', 'Black', 'Orange']
      },
      {
        type: 'Size',
        options: ['M', 'L', 'S', 'XL', 'XS']
      }
    ]

    return html`
      <h2>Integration Offline Stores</h2>
      <varient-options-editor .types=${TYPES} .value=${options}></varient-options-editor>
    `
  }

  stateChanged(state) {}
}

customElements.define('mms-integration-offline-stores', IntegrationOfflineStore)
