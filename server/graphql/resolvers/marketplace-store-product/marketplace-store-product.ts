import { getRepository } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const marketplaceStoreProductResolver = {
  async marketplaceStoreProduct(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceStoreProduct)

    return await getRepository(MarketplaceStoreProduct).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

