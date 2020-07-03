import { getRepository } from 'typeorm'
import { MarketplaceProductAttribute } from '../../../entities'

export const updateMarketplaceProductAttribute = {
  async updateMarketplaceProductAttribute(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceProductAttribute)
    const marketplaceProductAttribute = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceProductAttribute,
      ...patch,
      updater: context.state.user
    })
  }
}