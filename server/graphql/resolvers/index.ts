import * as BoardSetting from './board-setting'
import * as Platform from './platform'
import * as BizplacePlatform from './bizplace-platform'
import * as MarketplaceProduct from './marketplace-product'

export const queries = [BoardSetting.Query, Platform.Query, BizplacePlatform.Query, MarketplaceProduct.Query]

export const mutations = [Platform.Mutation, BizplacePlatform.Mutation, MarketplaceProduct.Mutation]

// export const subscriptions = [Scenario.Subscription]
