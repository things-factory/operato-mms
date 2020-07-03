import { MarketplaceProductCategory } from './marketplace-product-category'
import { NewMarketplaceProductCategory } from './new-marketplace-product-category'
import { MarketplaceProductCategoryPatch } from './marketplace-product-category-patch'
import { MarketplaceProductCategoryList } from './marketplace-product-category-list'

export const Mutation = `
  createMarketplaceProductCategory (
    marketplaceProductCategory: NewMarketplaceProductCategory!
  ): MarketplaceProductCategory

  updateMarketplaceProductCategory (
    name: String!
    patch: MarketplaceProductCategoryPatch!
  ): MarketplaceProductCategory

  updateMultipleMarketplaceProductCategory (
    patches: [MarketplaceProductCategoryPatch]!
  ): [MarketplaceProductCategory]

  deleteMarketplaceProductCategory (
    name: String!
  ): Boolean

  deleteMarketplaceProductCategories (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceProductCategories(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceProductCategoryList
  marketplaceProductCategory(name: String!): MarketplaceProductCategory
`

export const Types = [MarketplaceProductCategory, NewMarketplaceProductCategory, MarketplaceProductCategoryPatch, MarketplaceProductCategoryList]
