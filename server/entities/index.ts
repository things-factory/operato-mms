import { MarketplaceOrder } from './marketplace-order'
import { MarketplaceOrderItem } from './marketplace-order-item'
import { MarketplaceOrderShipping } from './marketplace-order-shipping'
import { MarketplaceProduct } from './marketplace-product'
import { MarketplaceStoreProduct } from './marketplace-store-product'
import { MarketplaceProductAttribute } from './marketplace-product-attribute'
import { MarketplaceProductCategory } from './marketplace-product-category'
import { MarketplaceProductVariation } from './marketplace-product-variation'
import { ShipmentProvider } from './shipment-provider'
import { StockReplenishment } from './stock-replenishment'

export const entities = [
  MarketplaceProduct,
  MarketplaceStoreProduct,
  MarketplaceProductAttribute,
  MarketplaceProductVariation,
  MarketplaceProductCategory,
  MarketplaceOrder,
  MarketplaceOrderItem,
  MarketplaceOrderShipping,
  ShipmentProvider,
  StockReplenishment
]

export {
  MarketplaceProduct,
  MarketplaceStoreProduct,
  MarketplaceProductAttribute,
  MarketplaceProductCategory,
  MarketplaceProductVariation,
  MarketplaceOrder,
  MarketplaceOrderItem,
  MarketplaceOrderShipping,
  ShipmentProvider,
  StockReplenishment
}
