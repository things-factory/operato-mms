import gql from 'graphql-tag'

export const MarketplaceOrderItem = gql`
  type MarketplaceOrderItem {
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
