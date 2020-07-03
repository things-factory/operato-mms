import gql from 'graphql-tag'

export const MarketplaceProductList = gql`
  type MarketplaceProductList {
    items: [MarketplaceProduct]
    total: Int
  }
`
