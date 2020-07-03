import gql from 'graphql-tag'

export const MarketplaceProductAttributePatch = gql`
  input MarketplaceProductAttributePatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
