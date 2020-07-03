import gql from 'graphql-tag'

export const NewMarketplaceProductCategory = gql`
  input NewMarketplaceProductCategory {
    name: String!
    description: String
  }
`
