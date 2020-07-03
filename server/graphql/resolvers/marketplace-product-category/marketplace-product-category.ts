import { getRepository } from 'typeorm'
import { MarketplaceProductCategory } from '../../../entities'

export const marketplaceProductCategoryResolver = {
  async marketplaceProductCategory(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceProductCategory)

    return await getRepository(MarketplaceProductCategory).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

