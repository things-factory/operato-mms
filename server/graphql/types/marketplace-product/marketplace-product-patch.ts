import gql from 'graphql-tag'

export const MarketplaceProductPatch = gql`
  input MarketplaceProductPatch {
    id: String
    marketplaceProductCategory: ObjectRef
    marketplaceProductVariations: [ObjectRef]
    itemId: String
    sku: String
    status: String
    name: String
    description: String
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
