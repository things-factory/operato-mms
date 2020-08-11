import { stockReplenishmentResolver } from './stock-replenishment'
import { stockReplenishmentsResolver } from './stock-replenishments'

import { updateStockReplenishment } from './update-stock-replenishment'
import { updateMultipleStockReplenishment } from './update-multiple-stock-replenishment'
import { generateStockReplenishment } from './generate-stock-replenishment'
import { deleteStockReplenishment } from './delete-stock-replenishment'
import { deleteStockReplenishments } from './delete-stock-replenishments'

export const Query = {
  ...stockReplenishmentsResolver,
  ...stockReplenishmentResolver
}

export const Mutation = {
  ...updateStockReplenishment,
  ...updateMultipleStockReplenishment,
  ...generateStockReplenishment,
  ...deleteStockReplenishment,
  ...deleteStockReplenishments
}
