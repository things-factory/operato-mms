import gql from 'graphql-tag'

export const NewMarketplaceProductVariation = gql`
  input NewMarketplaceProductVariation {
    variationId: String
    sku: String
    name: String
    type: String
    description: String
    isku: String
    channelSku: String
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
