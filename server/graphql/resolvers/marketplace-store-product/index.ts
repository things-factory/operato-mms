import { marketplaceStoreProductResolver } from './marketplace-store-product'
import { marketplaceStoreProductsResolver } from './marketplace-store-products'

import { updateMarketplaceStoreProduct } from './update-marketplace-store-product'
import { updateMultipleMarketplaceStoreProduct } from './update-multiple-marketplace-store-product'
import { createMarketplaceStoreProduct } from './create-marketplace-store-product'
import { deleteMarketplaceStoreProduct } from './delete-marketplace-store-product'
import { deleteMarketplaceStoreProducts } from './delete-marketplace-store-products'

export const Query = {
  ...marketplaceStoreProductsResolver,
  ...marketplaceStoreProductResolver
}

export const Mutation = {
  ...updateMarketplaceStoreProduct,
  ...updateMultipleMarketplaceStoreProduct,
  ...createMarketplaceStoreProduct,
  ...deleteMarketplaceStoreProduct,
  ...deleteMarketplaceStoreProducts
}
