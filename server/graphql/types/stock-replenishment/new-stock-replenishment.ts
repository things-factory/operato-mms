import gql from 'graphql-tag'

export const NewStockReplenishment = gql`
  input NewStockReplenishment {
    name: String!
    description: String
  }
`
