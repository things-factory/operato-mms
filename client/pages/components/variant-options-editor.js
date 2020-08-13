import { LitElement, html, css } from 'lit-element'
import './variant-option-editor'

export class VariantOptionsEditor extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          min-height: 200px;
          color: var(--secondary-color);
          font-size: 1rem;
        }

        label strong {
          font-weight: bold;
          color: var(--primary-color);
        }
        label mwc-icon {
          --mdc-icon-size: 20px;
          float: right;
          opacity: 0.8;
          cursor: pointer;
          margin-top: 4px;
        }
        label mwc-icon:hover,
        label mwc-icon:active {
          opacity: 1;
          color: var(--primary-color);
        }

        button {
          align-self: start;

          background-color: var(--button-background-color);
          border: var(--button-border);
          border-radius: var(--button-border-radius);
          margin: var(--button-margin);
          padding: var(--button-padding);
          color: var(--button-color);
          font: var(--button-font);
          text-transform: var(--button-text-transform);
        }
        button:hover,
        button:active {
          background-color: var(--button-background-focus-color);
        }
      `
    ]
  }

  static get properties() {
    return {
      types: Array,
      value: Array
    }
  }

  render() {
    const options = this.value || []

    return html`
      <div options>
        ${options.map(
          (option, index) => html`
            <label
              >Option <strong>#${index}</strong>
              <mwc-icon @click=${e => this.onclickDelete(e, index)}>cancel</mwc-icon></label
            >
            <variant-option-editor .types=${this.types} .value=${option}></variant-option-editor>
          `
        )}
      </div>
      <button type="button" @click=${this.onclickAddNew.bind(this)}>Add Another Option</button>
    `
  }

  onclickAddNew(e) {
    e.stopPropagation()

    const options = Array.from(this.renderRoot.querySelectorAll('variant-option-editor')).map(element => element.value)

    this.value = [...options, {}]
  }

  onclickDelete(e, index) {
    e.stopPropagation()

    const options = Array.from(this.renderRoot.querySelectorAll('variant-option-editor')).map(element => element.value)
    options.splice(index, 1)

    this.value = [...options]
  }
}

customElements.define('variant-options-editor', VariantOptionsEditor)
