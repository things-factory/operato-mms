import { MarketplaceProductAttribute } from './marketplace-product-attribute'
import { NewMarketplaceProductAttribute } from './new-marketplace-product-attribute'
import { MarketplaceProductAttributePatch } from './marketplace-product-attribute-patch'
import { MarketplaceProductAttributeList } from './marketplace-product-attribute-list'

export const Mutation = `
  createMarketplaceProductAttribute (
    marketplaceProductAttribute: NewMarketplaceProductAttribute!
  ): MarketplaceProductAttribute

  updateMarketplaceProductAttribute (
    name: String!
    patch: MarketplaceProductAttributePatch!
  ): MarketplaceProductAttribute

  updateMultipleMarketplaceProductAttribute (
    patches: [MarketplaceProductAttributePatch]!
  ): [MarketplaceProductAttribute]

  deleteMarketplaceProductAttribute (
    name: String!
  ): Boolean

  deleteMarketplaceProductAttributes (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceProductAttributes(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceProductAttributeList
  marketplaceProductAttribute(name: String!): MarketplaceProductAttribute
`

export const Types = [MarketplaceProductAttribute, NewMarketplaceProductAttribute, MarketplaceProductAttributePatch, MarketplaceProductAttributeList]
