import { marketplaceOrderItemResolver } from './marketplace-order-item'
import { marketplaceOrderItemsResolver } from './marketplace-order-items'

import { updateMarketplaceOrderItem } from './update-marketplace-order-item'
import { updateMultipleMarketplaceOrderItem } from './update-multiple-marketplace-order-item'
import { createMarketplaceOrderItem } from './create-marketplace-order-item'
import { deleteMarketplaceOrderItem } from './delete-marketplace-order-item'
import { deleteMarketplaceOrderItems } from './delete-marketplace-order-items'

export const Query = {
  ...marketplaceOrderItemsResolver,
  ...marketplaceOrderItemResolver
}

export const Mutation = {
  ...updateMarketplaceOrderItem,
  ...updateMultipleMarketplaceOrderItem,
  ...createMarketplaceOrderItem,
  ...deleteMarketplaceOrderItem,
  ...deleteMarketplaceOrderItems
}
