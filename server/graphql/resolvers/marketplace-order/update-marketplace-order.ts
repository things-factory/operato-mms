import { getRepository } from 'typeorm'
import { MarketplaceOrder } from '../../../entities'

export const updateMarketplaceOrder = {
  async updateMarketplaceOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceOrder)
    const marketplaceOrder = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceOrder,
      ...patch,
      updater: context.state.user
    })
  }
}