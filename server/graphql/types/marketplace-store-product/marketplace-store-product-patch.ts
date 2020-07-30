import gql from 'graphql-tag'

export const MarketplaceStoreProductPatch = gql`
  input MarketplaceStoreProductPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
