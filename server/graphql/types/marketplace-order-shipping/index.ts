import { MarketplaceOrderShipping } from './marketplace-order-shipping'
import { NewMarketplaceOrderShipping } from './new-marketplace-order-shipping'
import { MarketplaceOrderShippingPatch } from './marketplace-order-shipping-patch'
import { MarketplaceOrderShippingList } from './marketplace-order-shipping-list'

export const Mutation = `
  createMarketplaceOrderShipping (
    marketplaceOrderShipping: NewMarketplaceOrderShipping!
  ): MarketplaceOrderShipping

  updateMarketplaceOrderShipping (
    name: String!
    patch: MarketplaceOrderShippingPatch!
  ): MarketplaceOrderShipping

  updateMultipleMarketplaceOrderShipping (
    patches: [MarketplaceOrderShippingPatch]!
  ): [MarketplaceOrderShipping]

  deleteMarketplaceOrderShipping (
    name: String!
  ): Boolean

  deleteMarketplaceOrderShippings (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceOrderShippings(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceOrderShippingList
  marketplaceOrderShipping(name: String!): MarketplaceOrderShipping
`

export const Types = [MarketplaceOrderShipping, NewMarketplaceOrderShipping, MarketplaceOrderShippingPatch, MarketplaceOrderShippingList]
