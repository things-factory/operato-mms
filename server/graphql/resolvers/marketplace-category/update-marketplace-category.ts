import { getRepository } from 'typeorm'
import { MarketplaceCategory } from '../../../entities'

export const updateMarketplaceCategory = {
  async updateMarketplaceCategory(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceCategory)
    const marketplaceCategory = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceCategory,
      ...patch,
      updater: context.state.user
    })
  }
}