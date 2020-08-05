import gql from 'graphql-tag'

export const MarketplaceProductVariation = gql`
  type MarketplaceProductVariation {
    id: String
    domain: Domain
    marketplaceProduct: MarketplaceProduct
    variationId: String
    isku: String
    channelSku: String
    qty: Float
    bufferQty: Float
    thresholdQty: Float
    name: String
    type: String
    description: String
    costPrice: Float
    sellPrice: Float
    mrpPrice: Float
    discountId: String
    status: String
    afterTaxCostPrice: Float
    afterTaxSalesPrice: Float
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
