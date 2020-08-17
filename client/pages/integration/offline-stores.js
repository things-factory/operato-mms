import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'
import '../components/variant-options-editor'

const TYPES = ['Color', 'Size', 'Weight']

class IntegrationOfflineStore extends connect(store)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          background-color: var(--main-section-background-color);
          padding: var(--padding-wide);
        }
      `
    ]
  }

  static get properties() {
    return {
      title: 'integration offline stores',
      options: Array
    }
  }

  get context() {
    return {}
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
      <variant-options-editor
        .types=${TYPES}
        .value=${options}
        id="options"
        @change=${e => this.onchange(e)}
      ></variant-options-editor>

      <div>${JSON.stringify(options, null, 2)}</div>
    `
  }

  stateChanged(state) {}

  onchange(e) {
    e.stopPropagation()

    this.options = e.target.value
  }
}

customElements.define('mms-integration-offline-stores', IntegrationOfflineStore)
