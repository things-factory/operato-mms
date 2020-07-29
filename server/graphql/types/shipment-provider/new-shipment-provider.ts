import gql from 'graphql-tag'

export const NewShipmentProvider = gql`
  input NewShipmentProvider {
    name: String!
    description: String
  }
`
