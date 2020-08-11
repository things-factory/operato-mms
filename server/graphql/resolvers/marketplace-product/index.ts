import { marketplaceProductResolver } from './marketplace-product'
import { marketplaceProductsResolver } from './marketplace-products'

import { upsertMarketplaceProduct } from './upsert-marketplace-product'
import { updateMarketplaceProductResolver } from './update-marketplace-product'
import { createMarketplaceProductResolver } from './create-marketplace-product'
import { deleteMarketplaceProduct } from './delete-marketplace-product'
import { deleteMarketplaceProducts } from './delete-marketplace-products'

export const Query = {
  ...marketplaceProductsResolver,
  ...marketplaceProductResolver
}

export const Mutation = {
  ...updateMarketplaceProductResolver,
  ...upsertMarketplaceProduct,
  ...createMarketplaceProductResolver,
  ...deleteMarketplaceProduct,
  ...deleteMarketplaceProducts
}
