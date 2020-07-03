import { MarketplaceCategory } from './marketplace-category'
import { NewMarketplaceCategory } from './new-marketplace-category'
import { MarketplaceCategoryPatch } from './marketplace-category-patch'
import { MarketplaceCategoryList } from './marketplace-category-list'

export const Mutation = `
  createMarketplaceCategory (
    marketplaceCategory: NewMarketplaceCategory!
  ): MarketplaceCategory

  updateMarketplaceCategory (
    name: String!
    patch: MarketplaceCategoryPatch!
  ): MarketplaceCategory

  updateMultipleMarketplaceCategory (
    patches: [MarketplaceCategoryPatch]!
  ): [MarketplaceCategory]

  deleteMarketplaceCategory (
    name: String!
  ): Boolean

  deleteMarketplaceCategories (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceCategories(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceCategoryList
  marketplaceCategory(name: String!): MarketplaceCategory
`

export const Types = [MarketplaceCategory, NewMarketplaceCategory, MarketplaceCategoryPatch, MarketplaceCategoryList]
