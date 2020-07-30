import gql from 'graphql-tag'

export const MarketplaceStoreProductList = gql`
  type MarketplaceStoreProductList {
    items: [MarketplaceStoreProduct]
    total: Int
  }
`
