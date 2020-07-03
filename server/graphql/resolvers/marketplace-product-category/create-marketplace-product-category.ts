import { getRepository } from 'typeorm'
import { MarketplaceProductCategory } from '../../../entities'

export const createMarketplaceProductCategory = {
  async createMarketplaceProductCategory(_: any, { marketplaceProductCategory}, context: any) {
    return await getRepository(MarketplaceProductCategory).save({
      ...marketplaceProductCategory,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

