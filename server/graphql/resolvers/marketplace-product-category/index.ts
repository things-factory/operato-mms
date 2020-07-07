import { marketplaceProductCategoryResolver } from './marketplace-product-category'
import { marketplaceProductCategoriesResolver } from './marketplace-product-categories'

import { updateMarketplaceProductCategory } from './update-marketplace-product-category'
import { updateMultipleMarketplaceProductCategory } from './update-multiple-marketplace-product-category'
import { createMarketplaceProductCategory } from './create-marketplace-product-category'
import { deleteMarketplaceProductCategory } from './delete-marketplace-product-category'
import { deleteMarketplaceProductCategories } from './delete-marketplace-product-categories'

export const Query = {
  ...marketplaceProductCategoriesResolver,
  ...marketplaceProductCategoryResolver
}

export const Mutation = {
  ...updateMarketplaceProductCategory,
  ...updateMultipleMarketplaceProductCategory,
  ...createMarketplaceProductCategory,
  ...deleteMarketplaceProductCategory,
  ...deleteMarketplaceProductCategories
}
