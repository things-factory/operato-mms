import gql from 'graphql-tag'

export const NewMarketplaceProductVariation = gql`
  input NewMarketplaceProductVariation {
    name: String!
    description: String
  }
`
