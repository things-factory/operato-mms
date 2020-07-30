import gql from 'graphql-tag'

export const NewMarketplaceProduct = gql`
  input NewMarketplaceProduct {
    id: String
    itemId: Int
    name: String
    description: String
    marketplaceProductVariations: [NewMarketplaceProductVariation]
    marketplaceProductAttribute: NewMarketplaceProductAttribute
    marketplaceProductCategory: NewMarketplaceProductCategory
    itemId: String
    sku: String
    status: String
    currency: String
    hasVariation: Boolean
    costPrice: Float
    sellPrice: Float
    weight: Float
    categoryId: String
    packageLength: Float
    packageWidth: Float
    packageHeight: Float
    afterTaxCostPrice: Float
    afterTaxSalesPrice: Float
    condition: String
    daysToShip: String
    discountId: String
    isPreOrder: Boolean
  }
`
