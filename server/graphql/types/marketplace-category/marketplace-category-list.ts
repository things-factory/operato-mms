import gql from 'graphql-tag'

export const MarketplaceCategoryList = gql`
  type MarketplaceCategoryList {
    items: [MarketplaceCategory]
    total: Int
  }
`
