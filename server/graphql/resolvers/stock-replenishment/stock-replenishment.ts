import { getRepository } from 'typeorm'
import { StockReplenishment } from '../../../entities'

export const stockReplenishmentResolver = {
  async stockReplenishment(_: any, { name }, context: any) {
    const repository = getRepository(StockReplenishment)

    return await getRepository(StockReplenishment).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

