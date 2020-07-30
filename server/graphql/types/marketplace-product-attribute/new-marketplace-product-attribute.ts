import gql from 'graphql-tag'

export const NewMarketplaceProductAttribute = gql`
  input NewMarketplaceProductAttribute {
    name: String
    description: String
    attributeId: String
    isMandatory: Boolean
    attributeType: String
    option: String
    originalValue: String
  }
`
