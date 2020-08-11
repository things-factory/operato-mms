import gql from 'graphql-tag'

export const MarketplaceProduct = gql`
  type MarketplaceProduct {
    id: String
    domain: Domain
    marketplaceProductCategory: MarketplaceProductCategory
    marketplaceProductVariations: [MarketplaceProductVariation]
    itemId: String
    isku: String
    status: String
    name: String
    type: String
    storageType: String
    description: String
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
    daysToShip: String
    discountId: String
    isPreOrder: Boolean
    attachments: [Attachment]
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
