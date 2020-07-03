import gql from 'graphql-tag'

export const MarketplaceCategoryPatch = gql`
  input MarketplaceCategoryPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
