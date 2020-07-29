import { MarketplaceOrder } from './marketplace-order'
import { MarketplaceOrderItem } from './marketplace-order-item'
import { MarketplaceOrderShipping } from './marketplace-order-shipping'
import { MarketplaceProduct } from './marketplace-product'
import { MarketplaceProductAttribute } from './marketplace-product-attribute'
import { MarketplaceProductCategory } from './marketplace-product-category'
import { MarketplaceProductVariation } from './marketplace-product-variation'
import { ShipmentProvider } from './shipment-provider'

export const entities = [
  MarketplaceProduct,
  MarketplaceProductAttribute,
  MarketplaceProductVariation,
  MarketplaceProductCategory,
  MarketplaceOrder,
  MarketplaceOrderItem,
  MarketplaceOrderShipping,
  ShipmentProvider
]

export {
  MarketplaceProduct,
  MarketplaceProductAttribute,
  MarketplaceProductCategory,
  MarketplaceProductVariation,
  MarketplaceOrder,
  MarketplaceOrderItem,
  MarketplaceOrderShipping,
  ShipmentProvider
}
