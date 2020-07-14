import gql from 'graphql-tag'

export const MarketplaceProductPatch = gql`
  input MarketplaceProductPatch {
    id: String
    name: String
    description: String
    cuFlag: String
    stock: Int
    itemSku: String
  }
`
