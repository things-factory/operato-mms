import gql from 'graphql-tag'

export const MarketplaceOrderShippingList = gql`
  type MarketplaceOrderShippingList {
    items: [MarketplaceOrderShipping]
    total: Int
  }
`
