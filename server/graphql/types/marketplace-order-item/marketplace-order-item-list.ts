import gql from 'graphql-tag'

export const MarketplaceOrderItemList = gql`
  type MarketplaceOrderItemList {
    items: [MarketplaceOrderItem]
    total: Int
  }
`
