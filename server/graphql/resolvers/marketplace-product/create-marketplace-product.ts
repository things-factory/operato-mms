import { getRepository } from 'typeorm'
import { StoreAPI } from '@things-factory/marketplace-integration'
import { MarketplaceProduct } from '../../../entities'

export const createMarketplaceProduct = {
  async createMarketplaceProduct(_: any, { marketplaceProduct }, context: any) {
    return await getRepository(MarketplaceProduct).save({
      ...marketplaceProduct,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
