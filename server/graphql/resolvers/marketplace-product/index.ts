import { marketplaceProductResolver } from './marketplace-product'
import { marketplaceProductsResolver } from './marketplace-products'

import { updateMarketplaceProduct } from './update-marketplace-product'
import { updateMultipleMarketplaceProduct } from './update-multiple-marketplace-product'
import { createMarketplaceProduct } from './create-marketplace-product'
import { deleteMarketplaceProduct } from './delete-marketplace-product'
import { deleteMarketplaceProducts } from './delete-marketplace-products'

export const Query = {
  ...marketplaceProductsResolver,
  ...marketplaceProductResolver
}

export const Mutation = {
  ...updateMarketplaceProduct,
  ...updateMultipleMarketplaceProduct,
  ...createMarketplaceProduct,
  ...deleteMarketplaceProduct,
  ...deleteMarketplaceProducts
}
