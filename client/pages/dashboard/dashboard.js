import { html } from 'lit-element'
import { BoardViewerPage } from '@things-factory/board-ui'
import { UPDATE_BOARD_SETTINGS } from '../../actions/board-settings'
import { fetchBoardSettings } from '../../viewparts/fetch-board-settings'
import { openPopup } from '@things-factory/layout-base'
import { i18next } from '@things-factory/i18n-base'
import { client, store } from '@things-factory/shell'
import { gqlBuilder } from '@things-factory/utils'
import gql from 'graphql-tag'

const HOME_BOARD = 'dashboard'
const HOME_DESCRIPTION = 'home dashboard'

class Dashboard extends BoardViewerPage {
  stateChanged(state) {
    super.stateChanged(state)

    this._boardId = (state?.boardSetting?.[HOME_BOARD] || { board: {} })?.board?.id
  }

  get oopsNote() {
    return {
      icon: 'insert_chart',
      title: 'HOME DASHBOARD',
      description: 'There are no home dashboard setting. Pls, click to setting home dashboard.',
      click: e => this.onClickDashboardSetting(HOME_BOARD, HOME_DESCRIPTION)
    }
  }

  get context() {
    return {
      title: HOME_DESCRIPTION
    }
  }

  onClickDashboardSetting(name, description) {
    var popup = openPopup(
      html`
        <board-selector
          .creatable=${true}
          @board-selected=${async e => {
            var board = e.detail.board

            await this.saveSettings({
              name,
              value: board.id,
              category: 'board',
              description
            })

            var settings = await fetchBoardSettings()
            store.dispatch({
              type: UPDATE_BOARD_SETTINGS,
              settings: settings.reduce((settings, setting) => {
                settings[setting.name] = setting
                return settings
              }, {})
            })

            popup.close()
            this.requestUpdate()
          }}
        ></board-selector>
      `,
      {
        backdrop: true,
        size: 'large',
        title: i18next.t('title.dashboard setting')
      }
    )
  }

  async saveSettings({ name, value, category, description }) {
    if (!(name && value)) return

    await client.query({
      query: gql`
      mutation {
        updateSetting(${gqlBuilder.buildArgs({
          name,
          patch: {
            name,
            description,
            category,
            value
          }
        })}) {
          name
          value
        }
      }`
    })
  }
}

customElements.define('mms-dashboard', Dashboard)
