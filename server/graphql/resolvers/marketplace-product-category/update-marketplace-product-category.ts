import { getRepository } from 'typeorm'
import { MarketplaceProductCategory } from '../../../entities'

export const updateMarketplaceProductCategory = {
  async updateMarketplaceProductCategory(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceProductCategory)
    const marketplaceProductCategory = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceProductCategory,
      ...patch,
      updater: context.state.user
    })
  }
}