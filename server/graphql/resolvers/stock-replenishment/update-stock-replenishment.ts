import { getRepository } from 'typeorm'
import { StockReplenishment } from '../../../entities'

export const updateStockReplenishment = {
  async updateStockReplenishment(_: any, { name, patch }, context: any) {
    const repository = getRepository(StockReplenishment)
    const stockReplenishment = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...stockReplenishment,
      ...patch,
      updater: context.state.user
    })
  }
}