import gql from 'graphql-tag'

export const MarketplaceOrderShipping = gql`
  type MarketplaceOrderShipping {
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
