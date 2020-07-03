import gql from 'graphql-tag'

export const MarketplaceOrder = gql`
  type MarketplaceOrder {
    id: String
    name: String
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
