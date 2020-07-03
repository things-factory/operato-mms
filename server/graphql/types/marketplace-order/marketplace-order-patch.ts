import gql from 'graphql-tag'

export const MarketplaceOrderPatch = gql`
  input MarketplaceOrderPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
