import gql from 'graphql-tag'

export const MarketplaceProduct = gql`
  type MarketplaceProduct {
    id: String
    name: String
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    isku: String
    totalStock: Int
    stockBuffer: Int
    onHold: Int
    availableToPurchase: Int
    soldStock: Int
    actions: String
  }
`
