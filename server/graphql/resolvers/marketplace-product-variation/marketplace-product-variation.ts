import { getRepository } from 'typeorm'
import { MarketplaceProductVariation } from '../../../entities'

export const marketplaceProductVariationResolver = {
  async marketplaceProductVariation(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceProductVariation)

    return await getRepository(MarketplaceProductVariation).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

