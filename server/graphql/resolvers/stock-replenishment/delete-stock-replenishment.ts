import { getRepository } from 'typeorm'
import { StockReplenishment } from '../../../entities'

export const deleteStockReplenishment = {
  async deleteStockReplenishment(_: any, { name }, context: any) {
    await getRepository(StockReplenishment).delete({ domain: context.state.domain, name })
    return true
  }
}

