import { getRepository } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const createMarketplaceStoreProduct = {
  async createMarketplaceStoreProduct(_: any, { marketplaceStoreProduct}, context: any) {
    return await getRepository(MarketplaceStoreProduct).save({
      ...marketplaceStoreProduct,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

