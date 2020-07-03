import { getRepository } from 'typeorm'
import { MarketplaceOrderShipping } from '../../../entities'

export const createMarketplaceOrderShipping = {
  async createMarketplaceOrderShipping(_: any, { marketplaceOrderShipping}, context: any) {
    return await getRepository(MarketplaceOrderShipping).save({
      ...marketplaceOrderShipping,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

