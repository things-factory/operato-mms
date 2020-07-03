import { getRepository } from 'typeorm'
import { MarketplaceProductVariation } from '../../../entities'

export const updateMarketplaceProductVariation = {
  async updateMarketplaceProductVariation(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceProductVariation)
    const marketplaceProductVariation = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceProductVariation,
      ...patch,
      updater: context.state.user
    })
  }
}