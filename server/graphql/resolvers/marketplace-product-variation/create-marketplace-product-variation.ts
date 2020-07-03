import { getRepository } from 'typeorm'
import { MarketplaceProductVariation } from '../../../entities'

export const createMarketplaceProductVariation = {
  async createMarketplaceProductVariation(_: any, { marketplaceProductVariation}, context: any) {
    return await getRepository(MarketplaceProductVariation).save({
      ...marketplaceProductVariation,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

