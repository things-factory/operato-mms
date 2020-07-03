import { marketplaceCategoryResolver } from './marketplace-category'
import { marketplaceCategoriesResolver } from './marketplace-categorys'

import { updateMarketplaceCategory } from './update-marketplace-category'
import { updateMultipleMarketplaceCategory } from './update-multiple-marketplace-category'
import { createMarketplaceCategory } from './create-marketplace-category'
import { deleteMarketplaceCategory } from './delete-marketplace-category'
import { deleteMarketplaceCategories } from './delete-marketplace-categorys'

export const Query = {
  ...marketplaceCategoriesResolver,
  ...marketplaceCategoryResolver
}

export const Mutation = {
  ...updateMarketplaceCategory,
  ...updateMultipleMarketplaceCategory,
  ...createMarketplaceCategory,
  ...deleteMarketplaceCategory,
  ...deleteMarketplaceCategories
}
