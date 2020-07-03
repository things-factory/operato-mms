import { MarketplaceProductVariation } from './marketplace-product-variation'
import { NewMarketplaceProductVariation } from './new-marketplace-product-variation'
import { MarketplaceProductVariationPatch } from './marketplace-product-variation-patch'
import { MarketplaceProductVariationList } from './marketplace-product-variation-list'

export const Mutation = `
  createMarketplaceProductVariation (
    marketplaceProductVariation: NewMarketplaceProductVariation!
  ): MarketplaceProductVariation

  updateMarketplaceProductVariation (
    name: String!
    patch: MarketplaceProductVariationPatch!
  ): MarketplaceProductVariation

  updateMultipleMarketplaceProductVariation (
    patches: [MarketplaceProductVariationPatch]!
  ): [MarketplaceProductVariation]

  deleteMarketplaceProductVariation (
    name: String!
  ): Boolean

  deleteMarketplaceProductVariations (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceProductVariations(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceProductVariationList
  marketplaceProductVariation(name: String!): MarketplaceProductVariation
`

export const Types = [MarketplaceProductVariation, NewMarketplaceProductVariation, MarketplaceProductVariationPatch, MarketplaceProductVariationList]
