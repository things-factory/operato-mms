import gql from 'graphql-tag'

export const NewMarketplaceStoreProduct = gql`
  input NewMarketplaceStoreProduct {
    name: String!
    description: String
  }
`
