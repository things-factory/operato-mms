import { marketplaceOrderResolver } from './marketplace-order'
import { marketplaceOrdersResolver } from './marketplace-orders'

import { updateMarketplaceOrder } from './update-marketplace-order'
import { updateMultipleMarketplaceOrder } from './update-multiple-marketplace-order'
import { createMarketplaceOrder } from './create-marketplace-order'
import { deleteMarketplaceOrder } from './delete-marketplace-order'
import { deleteMarketplaceOrders } from './delete-marketplace-orders'

export const Query = {
  ...marketplaceOrdersResolver,
  ...marketplaceOrderResolver
}

export const Mutation = {
  ...updateMarketplaceOrder,
  ...updateMultipleMarketplaceOrder,
  ...createMarketplaceOrder,
  ...deleteMarketplaceOrder,
  ...deleteMarketplaceOrders
}
