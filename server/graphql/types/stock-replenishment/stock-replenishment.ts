import gql from 'graphql-tag'

export const StockReplenishment = gql`
  type StockReplenishment {
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
