import { MarketplaceProduct } from './marketplace-product'
import { NewMarketplaceProduct } from './new-marketplace-product'
import { MarketplaceProductPatch } from './marketplace-product-patch'
import { MarketplaceProductList } from './marketplace-product-list'

export const Mutation = `
  createMarketplaceProduct (
    marketplaceProduct: NewMarketplaceProduct!
    file: Upload
  ): MarketplaceProduct

  updateMarketplaceProduct (
    foundProduct: NewMarketplaceProduct!
    marketplaceProduct: MarketplaceProductPatch!
    file: Upload
  ): MarketplaceProduct

  upsertMarketplaceProduct (
    marketplaceProduct: MarketplaceProductPatch!
  ): MarketplaceProduct

  deleteMarketplaceProduct (
    name: String!
  ): Boolean

  deleteMarketplaceProducts (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceProducts(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceProductList
  marketplaceProduct(name: String!, isku: String!): MarketplaceProduct
`

export const Types = [MarketplaceProduct, NewMarketplaceProduct, MarketplaceProductPatch, MarketplaceProductList]
