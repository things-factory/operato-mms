import gql from 'graphql-tag'

export const MarketplaceProductCategoryList = gql`
  type MarketplaceProductCategoryList {
    items: [MarketplaceProductCategory]
    total: Int
  }
`
