import gql from 'graphql-tag'

export const MarketplaceProductVariation = gql`
  type MarketplaceProductVariation {
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
