import { LitElement, html, css } from 'lit-element'

export class VarientOptionEditor extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
        }

        select {
          width: 200px;
        }

        input {
          width: 200px;
        }

        span[options] {
          flex: 1;
        }

        [option] {
          display: inline;
          background-color: navy;
          color: white;
          margin: 0 4px;
        }
      `
    ]
  }

  static get properties() {
    return {
      types: Array,
      value: Object
    }
  }

  render() {
    const types = this.types || []
    const { type, options = [] } = this.value || {}

    return html`
      <select .value=${type} @change=${this.onchangeSelect.bind(this)}>
        <option> </option>
        ${types.map(t => html` <option value=${t} ?selected=${type == t}>${t}</option> `)}
      </select>

      <input type="text" @change=${this.onchangeAdd.bind(this)} />

      <span options>
        ${options.map(
          (option, index) =>
            html` <div option>${option}<span delete @click=${e => this.onclickDelete(e, index)}>&nbsp;X</span></div>`
        )}
      </span>
    `
  }

  onchangeSelect(e) {
    e.stopPropagation()

    const target = e.target
    const { type, options = [] } = this.value || {}

    this.value = {
      type: target.value,
      options
    }
  }

  onchangeAdd(e) {
    e.stopPropagation()

    const target = e.target
    const value = target.value
    const { type, options = [] } = this.value || {}

    if (options.indexOf(value) !== -1) {
      return
    }

    target.value = ''

    options.push(value)

    this.value = {
      type,
      options
    }
  }

  onclickDelete(e, index) {
    e.stopPropagation()

    const { type, options = [] } = this.value || {}

    if (index == -1) {
      return
    }

    options.splice(index, 1)

    this.value = {
      type,
      options
    }
  }
}

customElements.define('varient-option-editor', VarientOptionEditor)
