import gql from 'graphql-tag'

export const NewMarketplaceOrderShipping = gql`
  input NewMarketplaceOrderShipping {
    name: String!
    description: String
  }
`
