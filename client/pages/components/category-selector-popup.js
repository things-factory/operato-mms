import { css, html, LitElement } from 'lit-element'
import { i18next, localize } from '@things-factory/i18n-base'
import { ScrollbarStyles } from '@things-factory/styles'

export class CategorySelectorPopup extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      categories: Array,
      category: Object,
      confirmCallback: Function,
      categoryProvider: Function
    }
  }

  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;

          background-color: #fff;
        }

        .button-container {
          text-align: center;
        }
        .button-container > button {
          background-color: var(--button-background-color);
          border: var(--button-border);
          border-radius: var(--button-border-radius);
          margin: var(--button-margin);
          padding: var(--button-padding);
          color: var(--button-color);
          font: var(--button-font);
          text-transform: var(--button-text-transform);
        }
        .button-container > button:hover,
        .button-container > button:active {
          background-color: var(--button-background-focus-color);
        }

        [path] {
          padding: var(--padding-wide, 15px);
          color: var(--secondary-color);
        }
        [path] strong {
          color: var(--primary-color);
        }

        [categories] {
          flex: 1;

          display: flex;
          flex-direction: row;
          align-content: start;
          justify-content: start;

          overflow-x: auto;

          background-color: var(--main-section-background-color);
          padding: var(--padding-wide, 15px);
          border: var(--border-dark-color);
          border-width: 2px 0 1px 0;
        }

        [category-level] {
          min-width: 150px;
          align-self: stretch;
          position: relative;
          margin-right: -1px;

          border-radius: var(--border-radius);
          border: var(--border-dark-color);
          padding: var(--padding-narrow, 4px);
          background-color: #fff;
        }
        [category-level] > div {
          padding: var(--padding-narrow, 4px) var(--padding-default, 9px);
          color: var(--secondary-color);
          font-size: 0.9rem;
        }

        [category-level] > div span {
          float: right;
          opacity: 0.6;
        }

        [category-level] > div[selected] {
          background: rgba(0, 0, 0, 0.09);
          color: var(--primary-color);
          font-weight: bold;
        }
        div[search] {
          display: flex;
        }
        div[search] mwc-icon {
          --mdc-icon-size: 20px;

          flex: 20px;
          border-bottom: var(--border-dark-color);
        }
        div[search] input {
          flex: 1;
          border: none;
          border-bottom: var(--border-dark-color);
          max-width: 90%;
          font-size: 1rem;
        }
        div[search] input:focus {
          outline: none;
        }
      `
    ]
  }

  renderLevel(categories = [], path) {
    const selected = path.shift()
    const subcategories = categories.find(category => selected == category.id)?.children

    return html`
      <div category-level>
        <div search><mwc-icon>search</mwc-icon> <input type="text" /></div>

        ${categories.map(
          category =>
            html`
              <div @click=${e => this.onclickCategory(category)} ?selected=${selected === category.id}>
                ${category.name} <span>${category.hasSubcategories ? '>' : ''}</span>
              </div>
            `
        )}
      </div>

      ${subcategories && this.renderLevel(subcategories, path)}
    `
  }

  render() {
    const path = this.path
    const categories = this.categories || []

    return html`
      <div path>${i18next.t('target category')} : <strong>${path.join(' > ')}</strong></div>
      <div categories>${this.renderLevel(categories, path)}</div>
      <div class="button-container">
        <button @click=${this.oncancel.bind(this)}>${i18next.t('button.cancel')}</button>
        <button @click=${this.onconfirm.bind(this)}>${i18next.t('button.confirm')}</button>
      </div>
    `
  }

  updated(changes) {
    if (changes.has('category')) {
      this.updateCategories(this.category)
    }
  }

  async firstUpdated() {
    this.categories = await this.categoryProvider()
  }

  async updateCategories(category) {
    if (!category?.hasSubcategories || category.children) {
      return
    }

    category.children = await this.categoryProvider(category)
    this.requestUpdate()
  }

  get path() {
    const path = this.category?.path || ''
    // FIX-ME this is only for testing
    return new Array(path.length).fill(true).map((_, idx) => path.substr(0, idx + 1)) || []
  }

  async onclickCategory(category) {
    this.category = category
  }

  oncancel(e) {
    history.back()
  }

  onconfirm(e) {
    this.confirmCallback && this.confirmCallback(this.category)
    history.back()
  }
}

customElements.define('category-selector-popup', CategorySelectorPopup)
