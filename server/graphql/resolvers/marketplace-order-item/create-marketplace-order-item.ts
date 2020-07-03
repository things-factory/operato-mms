import { getRepository } from 'typeorm'
import { MarketplaceOrderItem } from '../../../entities'

export const createMarketplaceOrderItem = {
  async createMarketplaceOrderItem(_: any, { marketplaceOrderItem}, context: any) {
    return await getRepository(MarketplaceOrderItem).save({
      ...marketplaceOrderItem,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

