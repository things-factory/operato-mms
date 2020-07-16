import gql from 'graphql-tag'

export const MarketplaceProductPatch = gql`
  input MarketplaceProductPatch {
    name: String
    description: String
    cuFlag: String
    stock: Int
    itemSku: String
    originalPrice: Float
  }
`
