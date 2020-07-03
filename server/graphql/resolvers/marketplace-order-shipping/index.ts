import { marketplaceOrderShippingResolver } from './marketplace-order-shipping'
import { marketplaceOrderShippingsResolver } from './marketplace-order-shippings'

import { updateMarketplaceOrderShipping } from './update-marketplace-order-shipping'
import { updateMultipleMarketplaceOrderShipping } from './update-multiple-marketplace-order-shipping'
import { createMarketplaceOrderShipping } from './create-marketplace-order-shipping'
import { deleteMarketplaceOrderShipping } from './delete-marketplace-order-shipping'
import { deleteMarketplaceOrderShippings } from './delete-marketplace-order-shippings'

export const Query = {
  ...marketplaceOrderShippingsResolver,
  ...marketplaceOrderShippingResolver
}

export const Mutation = {
  ...updateMarketplaceOrderShipping,
  ...updateMultipleMarketplaceOrderShipping,
  ...createMarketplaceOrderShipping,
  ...deleteMarketplaceOrderShipping,
  ...deleteMarketplaceOrderShippings
}
