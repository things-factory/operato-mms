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
          display: flex;
          margin-left: auto;
        }

        [path] {
          margin: 10px;
        }

        [categories] {
          flex: 1;

          display: flex;
          flex-direction: row;
          align-content: start;
          justify-content: start;

          overflow-x: auto;
          margin: 10px;
        }

        [category-level] {
          min-width: 120px;
          align-self: stretch;

          border: 1px solid black;
          border-radius: 5px;
          margin: 4px;
          padding: 10px;
        }

        [selected] {
          color: white;
          background: black;
        }
      `
    ]
  }

  renderLevel(categories = [], path) {
    const selected = path.shift()
    const subcategories = categories.find(category => selected == category.id)?.children

    return html`
      <div category-level>
        ${categories.map(
          category =>
            html`
              <div @click=${e => this.onclickCategory(category)} ?selected=${selected === category.id}>
                ${category.name} ${category.hasSubcategories ? '>' : ''}
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
      <div path>${i18next.t('target category')} : ${path.join(' > ')}</div>
      <div categories>${this.renderLevel(categories, path)}</div>
      <div class="button-container">
        <mwc-button @click=${this.oncancel.bind(this)}>${i18next.t('button.cancel')}</mwc-button>
        <mwc-button @click=${this.onconfirm.bind(this)}>${i18next.t('button.confirm')}</mwc-button>
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
