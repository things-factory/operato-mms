import { StockReplenishment } from './stock-replenishment'
import { NewStockReplenishment } from './new-stock-replenishment'
import { StockReplenishmentPatch } from './stock-replenishment-patch'
import { StockReplenishmentList } from './stock-replenishment-list'

export const Mutation = `
  generateStockReplenishment (
    stockReplenishment: NewStockReplenishment!
  ): StockReplenishment

  updateStockReplenishment (
    name: String!
    patch: StockReplenishmentPatch!
  ): StockReplenishment

  updateMultipleStockReplenishment (
    patches: [StockReplenishmentPatch]!
  ): [StockReplenishment]

  deleteStockReplenishment (
    name: String!
  ): Boolean

  deleteStockReplenishments (
    names: [String]!
  ): Boolean
`

export const Query = `
  stockReplenishments(filters: [Filter], pagination: Pagination, sortings: [Sorting]): StockReplenishmentList
  stockReplenishment(name: String!): StockReplenishment
`

export const Types = [StockReplenishment, NewStockReplenishment, StockReplenishmentPatch, StockReplenishmentList]
