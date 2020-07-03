import { marketplaceProductAttributeResolver } from './marketplace-product-attribute'
import { marketplaceProductAttributesResolver } from './marketplace-product-attributes'

import { updateMarketplaceProductAttribute } from './update-marketplace-product-attribute'
import { updateMultipleMarketplaceProductAttribute } from './update-multiple-marketplace-product-attribute'
import { createMarketplaceProductAttribute } from './create-marketplace-product-attribute'
import { deleteMarketplaceProductAttribute } from './delete-marketplace-product-attribute'
import { deleteMarketplaceProductAttributes } from './delete-marketplace-product-attributes'

export const Query = {
  ...marketplaceProductAttributesResolver,
  ...marketplaceProductAttributeResolver
}

export const Mutation = {
  ...updateMarketplaceProductAttribute,
  ...updateMultipleMarketplaceProductAttribute,
  ...createMarketplaceProductAttribute,
  ...deleteMarketplaceProductAttribute,
  ...deleteMarketplaceProductAttributes
}
