
import { getRepository } from 'typeorm'
import { StockReplenishment } from '../../../entities'

export const generateStockReplenishment = {
  async generateStockReplenishment(_: any, { stockReplenishment, file }, context: any) {
    
    return await getRepository(StockReplenishment).save({
      ...stockReplenishment,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}