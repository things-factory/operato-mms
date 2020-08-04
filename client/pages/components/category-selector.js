import { i18next } from '@things-factory/i18n-base'
import { css, html, LitElement } from 'lit-element'

const categories = [
  { id: 'a', name: 'a', path: 'a' },
  {
    id: 'b',
    name: 'b',
    path: 'b',
    children: [
      { id: 'ba', name: 'ba', path: 'ba' },
      { id: 'bb', name: 'bb', path: 'bb' },
      { id: 'bc', name: 'bc', path: 'bc' },
      {
        id: 'bd',
        name: 'bd',
        path: 'bd',
        children: [
          { id: 'bda', name: 'bda', path: 'bda' },
          { id: 'bdb', name: 'bdb', path: 'bdb' },
          { id: 'bdc', name: 'bdc', path: 'bdc' },
          {
            id: 'bdd',
            name: 'bdd',
            path: 'bdd',
            children: [
              { id: 'bdda', name: 'bdda', path: 'bdda' },
              { id: 'bddb', name: 'bddb', path: 'bddb' },
              { id: 'bddc', name: 'bddc', path: 'bddc' },
              {
                id: 'bddd',
                name: 'bddd',
                path: 'bddd',
                children: [
                  { id: 'bddda', name: 'bddda', path: 'bddda' },
                  { id: 'bdddb', name: 'bdddb', path: 'bdddb' },
                  { id: 'bdddc', name: 'bdddc', path: 'bdddc' },
                  { id: 'bdddd', name: 'bdddd', path: 'bdddd' }
                ]
              }
            ]
          }
        ]
      },
      { id: 'be', name: 'be', path: 'be' },
      { id: 'bf', name: 'bf', path: 'bf' }
    ]
  },
  { id: 'c', name: 'c', path: 'c' },
  {
    id: 'd',
    name: 'd',
    path: 'd',
    children: [
      { id: 'da', name: 'da', path: 'da' },
      { id: 'db', name: 'db', path: 'db' },
      { id: 'dc', name: 'dc', path: 'dc' },
      {
        id: 'dd',
        name: 'dd',
        path: 'dd',
        children: [
          { id: 'dda', name: 'dda', path: 'dda' },
          { id: 'ddb', name: 'ddb', path: 'ddb' },
          { id: 'ddc', name: 'ddc', path: 'ddc' },
          {
            id: 'ddd',
            name: 'ddd',
            path: 'ddd',
            children: [
              { id: 'ddda', name: 'ddda', path: 'ddda' },
              { id: 'dddb', name: 'dddb', path: 'dddb' },
              { id: 'dddc', name: 'dddc', path: 'dddc' },
              {
                id: 'dddd',
                name: 'dddd',
                path: 'dddd',
                children: [
                  { id: 'dddda', name: 'dddda', path: 'dddda' },
                  { id: 'ddddb', name: 'ddddb', path: 'ddddb' },
                  { id: 'ddddc', name: 'ddddc', path: 'ddddc' },
                  { id: 'ddddd', name: 'ddddd', path: 'ddddd' }
                ]
              },
              { id: 'ddde', name: 'ddde', path: 'ddde' }
            ]
          },
          { id: 'dde', name: 'dde', path: 'dde' }
        ]
      },
      { id: 'de', name: 'de', path: 'de' }
    ]
  },
  { id: 'e', name: 'e', path: 'e' },
  { id: 'f', name: 'f', path: 'f' }
]

export class CategorySelector extends LitElement {
  static get properties() {
    return {
      path: Array,
      selected: Object,
      confirmCallback: Function
    }
  }

  static get styles() {
    return [
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

        [categories] {
          display: flex;
          flex-direction: row;
          align-content: start;
          justify-content: start;
          flex: 1;

          padding: 10px;
        }

        [category-level] {
          width: 100px;
          align-self: stretch;
          border: 1px solid black;

          margin: 4px;
          padding: 10px;
        }

        [selected] {
          color: white;
          background-color: black;
        }
      `
    ]
  }

  renderLevel(categories = [], path) {
    const selected = path.shift()

    return html`
      <div category-level>
        ${categories.map(
          category =>
            html`
              <div @click=${e => this.onclickCategory(category)} ?selected=${selected === category.id}>
                ${category.name} ${category.children ? '>' : ''}
              </div>
            `
        )}
      </div>
      ${categories.map(category =>
        category.children && selected === category.id ? this.renderLevel(category.children, path) : html``
      )}
    `
  }

  render() {
    const path = [...(this.path || [])]

    return html`
      <div categories>${this.renderLevel(categories, path)}</div>
      <div class="button-container">
        <mwc-button @click=${this.oncancel.bind(this)}>${i18next.t('button.cancel')}</mwc-button>
        <mwc-button @click=${this.onconfirm.bind(this)}>${i18next.t('button.confirm')}</mwc-button>
      </div>
    `
  }

  onclickCategory(category) {
    const path = category.path
    this.path = new Array(path.length).fill(true).map((_, idx) => path.substr(0, idx + 1))
  }

  oncancel(e) {
    history.back()
  }

  onconfirm(e) {
    this.confirmCallback && this.confirmCallback(this.selected)
    history.back()
  }

  async firstUpdated() {
    await this.updateComplete
  }
}

customElements.define('category-selector', CategorySelector)
