import gql from 'graphql-tag'

export const MarketplaceCategory = gql`
  type MarketplaceCategory {
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
