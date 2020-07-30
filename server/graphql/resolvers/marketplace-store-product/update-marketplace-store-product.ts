import { getRepository } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const updateMarketplaceStoreProduct = {
  async updateMarketplaceStoreProduct(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceStoreProduct)
    const marketplaceStoreProduct = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceStoreProduct,
      ...patch,
      updater: context.state.user
    })
  }
}