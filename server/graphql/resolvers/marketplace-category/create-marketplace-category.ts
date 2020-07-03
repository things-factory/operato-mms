import { getRepository } from 'typeorm'
import { MarketplaceCategory } from '../../../entities'

export const createMarketplaceCategory = {
  async createMarketplaceCategory(_: any, { marketplaceCategory}, context: any) {
    return await getRepository(MarketplaceCategory).save({
      ...marketplaceCategory,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

