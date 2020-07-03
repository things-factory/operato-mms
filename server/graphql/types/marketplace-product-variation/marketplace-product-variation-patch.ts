import gql from 'graphql-tag'

export const MarketplaceProductVariationPatch = gql`
  input MarketplaceProductVariationPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
