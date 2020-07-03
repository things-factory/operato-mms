import gql from 'graphql-tag'

export const MarketplaceOrderItemPatch = gql`
  input MarketplaceOrderItemPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
