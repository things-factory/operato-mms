import gql from 'graphql-tag'

export const MarketplaceProductCategory = gql`
  type MarketplaceProductCategory {
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
