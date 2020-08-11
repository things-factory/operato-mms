import gql from 'graphql-tag'

export const StockReplenishmentList = gql`
  type StockReplenishmentList {
    items: [StockReplenishment]
    total: Int
  }
`
