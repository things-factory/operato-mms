import { LitElement, html, css } from 'lit-element'
import '@material/mwc-button'
import { i18next, localize } from '@things-factory/i18n-base'

export class WizardView extends localize(i18next)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      ::slotted(*) {
        display: none;
      }

      ::slotted([active]) {
        display: initial;
        flex: 1;
      }

      [buttons] {
        text-align: right;
      }
      [buttons] mwc-button {
        margin-left: 10px;
      }
    `
  }

  static get properties() {
    return {
      current: Object,
      prev: String,
      next: String,
      done: Function
    }
  }

  firstUpdated() {
    var active = this.querySelector('[active]') || this.querySelector(`:first-child`)
    this.gotoStep(active)
  }

  getChildIndex(child) {
    var children = this.children
    var i = children.length - 1
    for (; i >= 0; i--) {
      if (child == children[i]) {
        break
      }
    }
    return i
  }

  async gotoStep(step) {
    if (this.current) {
      if (!(await this.current.commit())) {
        return
      } else {
        this.current?.removeAttribute('active')
      }
    }

    this.current =
      typeof step == 'string'
        ? this.querySelector(`[name=${step}]`)
        : typeof step == 'number'
        ? this.querySelector(`:nth-child(${step})`)
        : step

    this.current?.toggleAttribute('active', true)

    var index = this.getChildIndex(this.current)

    this.prev = this.current?.getAttribute('prev') || this.querySelector(`:nth-child(${index})`)
    this.next = this.current?.getAttribute('next') || this.querySelector(`:nth-child(${index + 2})`)

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          index,
          active: this.current
        }
      })
    )
  }

  render() {
    return html`
      <slot></slot>

      <div
        buttons
        @prev=${e => (this.prev = e.detail)}
        @next=${e => (this.next = e.detail)}
        @done=${e => (this.done = e.detail)}
      >
        ${this.prev
          ? html`<mwc-button
              raised
              label=${i18next.t('button.prev')}
              @click=${e => this.gotoStep(this.prev)}
            ></mwc-button>`
          : html``}
        ${this.next
          ? html`<mwc-button
              raised
              label=${i18next.t('button.save')}
              @click=${e => this.gotoStep(this.next)}
            ></mwc-button>`
          : html``}
        ${this.done
          ? html`<mwc-button raised label=${i18next.t('button.done')} @click=${e => this.finish()}></mwc-button>`
          : html``}
      </div>
    `
  }

  async finish() {
    if (this.current && !(await this.current.commit())) {
      return
    }

    this.done && this.done()
  }
}

customElements.define('wizard-view', WizardView)
