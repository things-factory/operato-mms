import { getRepository } from 'typeorm'
import { MarketplaceOrderItem } from '../../../entities'

export const updateMarketplaceOrderItem = {
  async updateMarketplaceOrderItem(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceOrderItem)
    const marketplaceOrderItem = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceOrderItem,
      ...patch,
      updater: context.state.user
    })
  }
}