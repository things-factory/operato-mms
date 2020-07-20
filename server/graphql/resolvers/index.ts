import * as BoardSetting from './board-setting'
import * as MarketplaceOrder from './marketplace-order'
import * as MarketplaceOrderItem from './marketplace-order-item'
import * as MarketplaceOrderShipping from './marketplace-order-shipping'
import * as MarketplaceProduct from './marketplace-product'
import * as MarketplaceProductAttribute from './marketplace-product-attribute'
import * as MarketplaceProductCategory from './marketplace-product-category'
import * as MarketplaceProductVariation from './marketplace-product-variation'

export const queries = [
  BoardSetting.Query,
  MarketplaceProduct.Query,
  MarketplaceOrder.Query,
  MarketplaceOrderItem.Query,
  MarketplaceOrderShipping.Query,
  MarketplaceProductAttribute.Query,
  MarketplaceProductCategory.Query,
  MarketplaceProductVariation.Query
]

export const mutations = [
  MarketplaceProduct.Mutation,
  MarketplaceOrder.Mutation,
  MarketplaceOrderItem.Mutation,
  MarketplaceOrderShipping.Mutation,
  MarketplaceProductAttribute.Mutation,
  MarketplaceProductCategory.Mutation,
  MarketplaceProductVariation.Mutation
]

// export const subscriptions = [Scenario.Subscription]
