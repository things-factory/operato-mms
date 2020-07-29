import gql from 'graphql-tag'

export const ShipmentProviderList = gql`
  type ShipmentProviderList {
    items: [ShipmentProvider]
    total: Int
  }
`
