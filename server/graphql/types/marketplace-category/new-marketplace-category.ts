import gql from 'graphql-tag'

export const NewMarketplaceCategory = gql`
  input NewMarketplaceCategory {
    name: String!
    description: String
  }
`
