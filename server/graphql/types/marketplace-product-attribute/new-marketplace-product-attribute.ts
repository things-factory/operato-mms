import gql from 'graphql-tag'

export const NewMarketplaceProductAttribute = gql`
  input NewMarketplaceProductAttribute {
    name: String!
    description: String
  }
`
