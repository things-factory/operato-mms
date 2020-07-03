import gql from 'graphql-tag'

export const MarketplaceOrderList = gql`
  type MarketplaceOrderList {
    items: [MarketplaceOrder]
    total: Int
  }
`
