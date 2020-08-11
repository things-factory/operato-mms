import gql from 'graphql-tag'

export const StockReplenishmentPatch = gql`
  input StockReplenishmentPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
