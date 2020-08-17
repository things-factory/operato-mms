import { LitElement, html, css } from 'lit-element'

export class VariantOptionEditor extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
          margin-bottom: var(--margin-default);
          padding: var(--padding-default);
          padding-left: 0;
          border-bottom: var(--border-dark-color);
        }

        select,
        input,
        [option] {
          border: var(--border-dark-color);
          border-radius: var(--border-radius);
          padding: var(--padding-narrow);
          margin-right: var(--margin-narrow);
          font-size: 0.9rem;
        }

        span[options] {
          flex: 1;
          margin-left: 0 0 0 10px;
        }

        [option] {
          display: inline-block;
          background-color: var(--primary-color);
          margin: 1px 0;
          padding: 2px 4px;
          color: white;
          white-space: nowrap;
        }

        [delete] {
          margin-left: var(--margin-narrow);
          opacity: 0.5;
        }
        [delete]:hover {
          opacity: 1;
          cursor: pointer;
        }

        select:focus,
        input:focus {
          outline: none;
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
            html` <div option>${option}<span delete @click=${e => this.onclickDelete(e, index)}>X</span></span>`
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

    this.notifyChange()
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

    this.notifyChange()
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

    this.notifyChange()
  }

  notifyChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: this.value,
        bubbles: true
      })
    )
  }
}

customElements.define('variant-option-editor', VariantOptionEditor)
