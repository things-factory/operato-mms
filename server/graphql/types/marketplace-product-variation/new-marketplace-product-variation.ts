import gql from 'graphql-tag'

export const NewMarketplaceProductVariation = gql`
  input NewMarketplaceProductVariation {
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
