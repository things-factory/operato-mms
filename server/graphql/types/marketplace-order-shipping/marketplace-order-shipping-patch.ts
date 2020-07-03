import gql from 'graphql-tag'

export const MarketplaceOrderShippingPatch = gql`
  input MarketplaceOrderShippingPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
