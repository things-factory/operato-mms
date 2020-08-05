import gql from 'graphql-tag'

export const NewMarketplaceProduct = gql`
  input NewMarketplaceProduct {
    id: String
    name: String
    description: String
    type: String
    marketplaceProductVariations: [NewMarketplaceProductVariation]
    marketplaceProductAttribute: NewMarketplaceProductAttribute
    marketplaceProductCategory: NewMarketplaceProductCategory
    itemId: String
    isku: String
    status: String
    currency: String
    hasVariation: Boolean
    costPrice: Float
    mrpPrice: Float
    sellPrice: Float
    weight: Float
    categoryId: String
    packageLength: Float
    packageWidth: Float
    packageHeight: Float
    afterTaxCostPrice: Float
    afterTaxSalesPrice: Float
    condition: String
    storageType: String
    daysToShip: String
    discountId: String
    isPreOrder: Boolean
  }
`
