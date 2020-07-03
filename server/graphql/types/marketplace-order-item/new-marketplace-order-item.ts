import gql from 'graphql-tag'

export const NewMarketplaceOrderItem = gql`
  input NewMarketplaceOrderItem {
    name: String!
    description: String
  }
`
