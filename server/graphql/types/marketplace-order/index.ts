import { MarketplaceOrder } from './marketplace-order'
import { NewMarketplaceOrder } from './new-marketplace-order'
import { MarketplaceOrderPatch } from './marketplace-order-patch'
import { MarketplaceOrderList } from './marketplace-order-list'

export const Mutation = `
  createMarketplaceOrder (
    marketplaceOrder: NewMarketplaceOrder!
  ): MarketplaceOrder

  updateMarketplaceOrder (
    name: String!
    patch: MarketplaceOrderPatch!
  ): MarketplaceOrder

  updateMultipleMarketplaceOrder (
    patches: [MarketplaceOrderPatch]!
  ): [MarketplaceOrder]

  deleteMarketplaceOrder (
    name: String!
  ): Boolean

  deleteMarketplaceOrders (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceOrderList
  marketplaceOrder(name: String!): MarketplaceOrder
`

export const Types = [MarketplaceOrder, NewMarketplaceOrder, MarketplaceOrderPatch, MarketplaceOrderList]
