import gql from 'graphql-tag'

export const MarketplaceProductAttribute = gql`
  type MarketplaceProductAttribute {
    id: String
    name: String
    domain: Domain
    marketplaceProduct: MarketplaceProduct
    attributeId: String
    isMandatory: Boolean
    attributeType: String
    option: String
    originalValue: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
