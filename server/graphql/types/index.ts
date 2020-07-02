import * as BoardSetting from './board-setting'
import * as Platform from './platform'
import * as BizplacePlatform from './bizplace-platform' 

export const queries = [BoardSetting.Query,Platform.Query,BizplacePlatform.Query]

export const mutations = [Platform.Mutation,BizplacePlatform.Mutation]

// export const subscriptions = [Scenario.Subscription]

export const types = [...BoardSetting.Types , ...Platform.Types, ...BizplacePlatform.Types]
