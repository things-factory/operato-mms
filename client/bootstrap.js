import { html } from 'lit-element'
import { store } from '@things-factory/shell'
import {
  appendViewpart,
  updateViewpart,
  toggleOverlay,
  TOOL_POSITION,
  VIEWPART_POSITION
} from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import { ADD_SETTING } from '@things-factory/setting-base'
import '@things-factory/setting-ui/client/setting-lets/domain-switch-let'

import notification from './reducers/notification'

import './viewparts/user-circle'
import './viewparts/menu-tools'
import './viewparts/notification-badge'
import './viewparts/notification-list'

console.log(
  `%c
  ▄▄  ▄▄▄  ▄▄▄ ▄▄▄   ▄▄  ▄▄▄  ▄▄      ▄▄▄  ▄▄▄ ▄   ▄   ▄▄▄ ▄▄▄ 
 ▓  ▓ ▓  ▓ ▓   ▓  ▓ ▓  ▓  ▓  ▓  ▓    ▓   ▀ ▓   ▓   ▓   ▓   ▓  ▓
 ▓  ▓ ▓▀▀  ▓▀▀ ▓▀▀▄ ▓▀▀▓  ▓  ▓  ▓ ▀▀ ▀▀▄▄  ▓▀▀ ▓   ▓   ▓▀▀ ▓▀▀▄
 ▓  ▓ ▓    ▓   ▓  ▓ ▓  ▓  ▓  ▓  ▓    ▄   ▓ ▓   ▓   ▓   ▓   ▓  ▓
  ▀▀  ▀    ▀▀▀ ▀  ▀ ▀  ▀  ▀   ▀▀      ▀▀▀  ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀  ▀
`,
  'background: #222; color: #bada55'
)

export default function bootstrap() {
  /* initialize reducers */
  store.addReducers({ notification })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.2em;">Seller</span>
      `,
      position: TOOL_POSITION.FRONT
    }
  })

  /* append viewpart anchor to asidebar */
  appendViewpart({
    name: 'asidebar-anchor',
    viewpart: {
      show: false,
      hovering: 'edge',
      backdrop: true
    },
    position: VIEWPART_POSITION.ASIDEBAR
  })

  /* append top-menu to layout */
  var width

  appendViewpart({
    name: 'seller-topmenu',
    viewpart: {
      show: true,
      template: html`
        <menu-tools></menu-tools>
      `
    },
    position: VIEWPART_POSITION.NAVBAR
  })

  store.subscribe(async () => {
    var state = store.getState()

    if (state.layout.width == width) {
      return
    }

    width = state.layout.width

    updateViewpart('seller-topmenu', {
      position: width == 'WIDE' ? VIEWPART_POSITION.NAVBAR : VIEWPART_POSITION.FOOTERBAR
    })
  })

  /* setting app-tools */
  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <notification-badge
          @click=${e => {
            toggleOverlay('notification', {
              // backdrop: true
            })
          }}
        >
        </notification-badge>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  appendViewpart({
    name: 'notification',
    viewpart: {
      show: false,
      hovering: 'edge',
      template: html`
        <notification-list style="min-width: 300px;"></notification-list>
      `
    },
    position: VIEWPART_POSITION.ASIDEBAR
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <user-circle> </user-circle>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  /* for settings */
  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 10,
      template: html`
        <domain-switch-let></domain-switch-let>
      `
    }
  })
}
