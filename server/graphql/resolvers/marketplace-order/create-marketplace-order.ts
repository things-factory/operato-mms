import { getRepository } from 'typeorm'
import { MarketplaceOrder } from '../../../entities'

export const createMarketplaceOrder = {
  async createMarketplaceOrder(_: any, { marketplaceOrder}, context: any) {
    return await getRepository(MarketplaceOrder).save({
      ...marketplaceOrder,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

