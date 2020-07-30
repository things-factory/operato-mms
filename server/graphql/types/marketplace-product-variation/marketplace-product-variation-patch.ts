import gql from 'graphql-tag'

export const MarketplaceProductVariationPatch = gql`
  input MarketplaceProductVariationPatch {
    id: String
    marketplaceProduct: ObjectRef
    variationId: String
    sku: String
    name: String
    description: String
    costPrice: Float
    sellPrice: Float
    discountId: String
    status: String
    afterTaxCostPrice: Float
    afterTaxSalesPrice: Float
  }
`
