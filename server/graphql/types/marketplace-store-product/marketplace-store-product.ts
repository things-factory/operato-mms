import gql from 'graphql-tag'

export const MarketplaceStoreProduct = gql`
  type MarketplaceStoreProduct {
    id: String
    domain: Domain
    marketplaceProduct: MarketplaceProduct
    marketplaceStore: MarketplaceStore
    status: String
  }
`
