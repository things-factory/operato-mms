import gql from 'graphql-tag'

export const MarketplaceProductAttributeList = gql`
  type MarketplaceProductAttributeList {
    items: [MarketplaceProductAttribute]
    total: Int
  }
`
