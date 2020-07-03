import gql from 'graphql-tag'

export const NewMarketplaceOrder = gql`
  input NewMarketplaceOrder {
    name: String!
    description: String
  }
`
