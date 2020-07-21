import { MarketplaceOrder } from './marketplace-order'
import { MarketplaceOrderItem } from './marketplace-order-item'
import { MarketplaceOrderShipping } from './marketplace-order-shipping'
import { MarketplaceProduct } from './marketplace-product'
import { MarketplaceProductAttribute } from './marketplace-product-attribute'
import { MarketplaceProductCategory } from './marketplace-product-category'
import { MarketplaceProductVariation } from './marketplace-product-variation'

export const entities = [
  MarketplaceProduct,
  MarketplaceProductAttribute,
  MarketplaceProductVariation,
  MarketplaceProductCategory,
  MarketplaceOrder,
  MarketplaceOrderItem,
  MarketplaceOrderShipping
]

export {
  MarketplaceProduct,
  MarketplaceProductAttribute,
  MarketplaceProductCategory,
  MarketplaceProductVariation,
  MarketplaceOrder,
  MarketplaceOrderItem,
  MarketplaceOrderShipping
}
