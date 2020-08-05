import { css, html, LitElement } from 'lit-element'
import { openPopup } from '@things-factory/layout-base'
import './category-selector-popup'
import { getCategories } from './category-provider'

export class CategorySelector extends LitElement {
  static get properties() {
    return {
      category: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ]
  }

  render() {
    return this.category?.name
  }

  connectedCallback() {
    super.connectedCallback()
    this._eventHandler = this.onclick.bind(this)
    this.addEventListener('click', this._eventHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._eventHandler)
  }

  confirmCallback(category) {
    this.category = category
    dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        cancelable: true,
        details: category
      })
    )
  }

  onclick(e) {
    openPopup(
      html`
        <category-selector-popup
          .category=${this.category}
          .confirmCallback=${this.confirmCallback.bind(this)}
          .categoryProvider=${getCategories}
        ></category-selector-popup>
      `,
      {
        backdrop: true,
        size: 'large',
        title: 'select category'
      }
    )
  }
}

customElements.define('category-selector', CategorySelector)
