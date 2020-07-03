import gql from 'graphql-tag'

export const MarketplaceProductVariationList = gql`
  type MarketplaceProductVariationList {
    items: [MarketplaceProductVariation]
    total: Int
  }
`
