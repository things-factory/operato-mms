import gql from 'graphql-tag'

export const NewMarketplaceProduct = gql`
  input NewMarketplaceProduct {
    name: String!
    description: String
  }
`
