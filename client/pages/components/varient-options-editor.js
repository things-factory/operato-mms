import { LitElement, html, css } from 'lit-element'
import './varient-option-editor'

export class VarientOptionsEditor extends LitElement {
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
            <varient-option-editor .types=${this.types} .value=${option}></varient-option-editor>
          `
        )}
      </div>
      <button type="button" @click=${this.onclickAddNew.bind(this)}>Add Another Option</button>
    `
  }

  onclickAddNew(e) {
    e.stopPropagation()

    const options = Array.from(this.renderRoot.querySelectorAll('varient-option-editor')).map(element => element.value)

    this.value = [...options, {}]
  }

  onclickDelete(e, index) {
    e.stopPropagation()

    const options = Array.from(this.renderRoot.querySelectorAll('varient-option-editor')).map(element => element.value)
    options.splice(index, 1)

    this.value = [...options]
  }
}

customElements.define('varient-options-editor', VarientOptionsEditor)
