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
        }

        button {
          align-self: start;
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
            <label>Option #${index}<span @click=${e => this.onclickDelete(e, index)}>&nbsp;X</span></label>
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
