import gql from 'graphql-tag'

export const MarketplaceProductAttribute = gql`
  type MarketplaceProductAttribute {
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
