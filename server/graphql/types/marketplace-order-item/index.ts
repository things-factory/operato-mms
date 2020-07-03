import { MarketplaceOrderItem } from './marketplace-order-item'
import { NewMarketplaceOrderItem } from './new-marketplace-order-item'
import { MarketplaceOrderItemPatch } from './marketplace-order-item-patch'
import { MarketplaceOrderItemList } from './marketplace-order-item-list'

export const Mutation = `
  createMarketplaceOrderItem (
    marketplaceOrderItem: NewMarketplaceOrderItem!
  ): MarketplaceOrderItem

  updateMarketplaceOrderItem (
    name: String!
    patch: MarketplaceOrderItemPatch!
  ): MarketplaceOrderItem

  updateMultipleMarketplaceOrderItem (
    patches: [MarketplaceOrderItemPatch]!
  ): [MarketplaceOrderItem]

  deleteMarketplaceOrderItem (
    name: String!
  ): Boolean

  deleteMarketplaceOrderItems (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceOrderItems(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceOrderItemList
  marketplaceOrderItem(name: String!): MarketplaceOrderItem
`

export const Types = [MarketplaceOrderItem, NewMarketplaceOrderItem, MarketplaceOrderItemPatch, MarketplaceOrderItemList]
