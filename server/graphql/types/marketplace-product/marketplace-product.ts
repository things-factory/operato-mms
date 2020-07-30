import gql from 'graphql-tag'

export const MarketplaceProduct = gql`
  type MarketplaceProduct {
    id: String
    name: String
    itemId: Int
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    itemSku: String
    stock: Int
    stockBuffer: Int
    onHold: Int
    availableToPurchase: Int
    soldStock: Int
    actions: String
    originalPrice: Float
    weight: Float
    packageWidth: Int
    packageLength: Int
    packageHeight: Int
  }
`
