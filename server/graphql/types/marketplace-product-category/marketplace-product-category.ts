import gql from 'graphql-tag'

export const MarketplaceProductCategory = gql`
  type MarketplaceProductCategory {
    id: String
    name: String
    domain: Domain
    marketplaceProduct: MarketplaceProduct
    categoryId: String
    childCategory: Boolean
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
