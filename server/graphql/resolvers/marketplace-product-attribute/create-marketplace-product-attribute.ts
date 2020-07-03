import { getRepository } from 'typeorm'
import { MarketplaceProductAttribute } from '../../../entities'

export const createMarketplaceProductAttribute = {
  async createMarketplaceProductAttribute(_: any, { marketplaceProductAttribute}, context: any) {
    return await getRepository(MarketplaceProductAttribute).save({
      ...marketplaceProductAttribute,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

