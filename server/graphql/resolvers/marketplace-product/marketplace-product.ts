import { getRepository } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'

export const marketplaceProductResolver = {
  async marketplaceProduct(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceProduct)

    return await getRepository(MarketplaceProduct).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

