import gql from 'graphql-tag'

export const MarketplaceProductCategoryPatch = gql`
  input MarketplaceProductCategoryPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
