import gql from 'graphql-tag'

export const NewMarketplaceProduct = gql`
  input NewMarketplaceProduct {
    id: String
    itemId: Int
    name: String
    description: String
    itemSku: String
    stock: Int
    stockBuffer: Int
    onHold: Int
    availableToPurchase: Int
    soldStock: Int
    actions: String
    originalPrice: Float
    weight: Float
    packageWidth: Int
    packageLength: Int
    packageHeight: Int
  }
`
