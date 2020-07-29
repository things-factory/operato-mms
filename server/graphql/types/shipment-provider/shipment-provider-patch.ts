import gql from 'graphql-tag'

export const ShipmentProviderPatch = gql`
  input ShipmentProviderPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
