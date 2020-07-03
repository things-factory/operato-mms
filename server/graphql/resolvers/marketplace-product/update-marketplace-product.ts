import { getRepository } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'

export const updateMarketplaceProduct = {
  async updateMarketplaceProduct(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceProduct)
    const marketplaceProduct = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceProduct,
      ...patch,
      updater: context.state.user
    })
  }
}