import gql from 'graphql-tag'

export const ShipmentProvider = gql`
  type ShipmentProvider {
    id: String
    name: String
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
