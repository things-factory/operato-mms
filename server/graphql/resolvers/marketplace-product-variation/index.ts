import { marketplaceProductVariationResolver } from './marketplace-product-variation'
import { marketplaceProductVariationsResolver } from './marketplace-product-variations'

import { updateMarketplaceProductVariation } from './update-marketplace-product-variation'
import { updateMultipleMarketplaceProductVariation } from './update-multiple-marketplace-product-variation'
import { createMarketplaceProductVariation } from './create-marketplace-product-variation'
import { deleteMarketplaceProductVariation } from './delete-marketplace-product-variation'
import { deleteMarketplaceProductVariations } from './delete-marketplace-product-variations'

export const Query = {
  ...marketplaceProductVariationsResolver,
  ...marketplaceProductVariationResolver
}

export const Mutation = {
  ...updateMarketplaceProductVariation,
  ...updateMultipleMarketplaceProductVariation,
  ...createMarketplaceProductVariation,
  ...deleteMarketplaceProductVariation,
  ...deleteMarketplaceProductVariations
}
