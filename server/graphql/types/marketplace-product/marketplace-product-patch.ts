import gql from 'graphql-tag'

export const MarketplaceProductPatch = gql`
  input MarketplaceProductPatch {
    id: String
    marketplaceProductCategory: ObjectRef
    marketplaceProductVariations: [ObjectRef]
    itemId: String
    isku: String
    status: String
    name: String
    description: String
    type: String
    currency: String
    hasVariation: Boolean
    categoryId: String
    weight: Float
    costPrice: Float
    storageType: String
    packageLength: Float
    packageWidth: Float
    packageHeight: Float
    afterTaxCostPrice: Float
    afterTaxSalesPrice: Float
    condition: String
    daysToShip: String
    discountId: String
    isPreOrder: Boolean
    file: [Attachment]
  }
`
