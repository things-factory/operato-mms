import gql from 'graphql-tag'

export const MarketplaceProductVariation = gql`
  type MarketplaceProductVariation {
    id: String
    domain: Domain
    marketplaceProduct: MarketplaceProduct
    variationId: String
    sku: String
    name: String
    type: String
    description: String
    costPrice: Float
    sellPrice: Float
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
