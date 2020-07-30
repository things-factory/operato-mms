import gql from 'graphql-tag'

export const MarketplaceStoreProduct = gql`
  type MarketplaceStoreProduct {
    id: String
    marketplaceProduct: MarketplaceProduct
    marketplaceStore: MarketplaceStore
    status: String
  }
`
