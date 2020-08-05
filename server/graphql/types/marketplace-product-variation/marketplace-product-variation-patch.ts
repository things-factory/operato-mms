import gql from 'graphql-tag'

export const MarketplaceProductVariationPatch = gql`
  input MarketplaceProductVariationPatch {
    id: String
    marketplaceProduct: ObjectRef
    variationId: String
    isku: String
    channelSku: String
    name: String
    type: String
    description: String
    qty: Float
    bufferQty: Float
    thresholdQty: Float
    costPrice: Float
    sellPrice: Float
    mrpPrice: Float
    discountId: String
    status: String
    afterTaxCostPrice: Float
    afterTaxSalesPrice: Float
  }
`
