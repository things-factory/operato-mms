import { getRepository } from 'typeorm'
import { MarketplaceCategory } from '../../../entities'

export const marketplaceCategoryResolver = {
  async marketplaceCategory(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceCategory)

    return await getRepository(MarketplaceCategory).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

