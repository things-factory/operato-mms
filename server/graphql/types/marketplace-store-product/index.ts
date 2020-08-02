import { MarketplaceStoreProduct } from './marketplace-store-product'
import { NewMarketplaceStoreProduct } from './new-marketplace-store-product'
import { MarketplaceStoreProductPatch } from './marketplace-store-product-patch'
import { MarketplaceStoreProductList } from './marketplace-store-product-list'

export const Mutation = `
  createMarketplaceStoreProduct (
    marketplaceStoreProduct: NewMarketplaceStoreProduct!
  ): MarketplaceStoreProduct

  updateMarketplaceStoreProduct (
    name: String!
    patch: MarketplaceStoreProductPatch!
  ): MarketplaceStoreProduct

  updateMultipleMarketplaceStoreProduct (
    patches: [MarketplaceStoreProductPatch]!
  ): [MarketplaceStoreProduct]

  deleteMarketplaceStoreProduct (
    id: String!
  ): Boolean

  deleteMarketplaceStoreProducts (
    ids: [String]!
  ): Boolean
`

export const Query = `
  marketplaceStoreProducts(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceStoreProductList
  marketplaceStoreProduct(name: String!): MarketplaceStoreProduct
`

export const Types = [
  MarketplaceStoreProduct,
  NewMarketplaceStoreProduct,
  MarketplaceStoreProductPatch,
  MarketplaceStoreProductList
]
