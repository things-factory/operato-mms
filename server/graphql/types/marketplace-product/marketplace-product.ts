import gql from 'graphql-tag'

export const MarketplaceProduct = gql`
  type MarketplaceProduct {
    name: String
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
  }
`
