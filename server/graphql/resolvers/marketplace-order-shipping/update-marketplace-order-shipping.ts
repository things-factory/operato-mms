import { getRepository } from 'typeorm'
import { MarketplaceOrderShipping } from '../../../entities'

export const updateMarketplaceOrderShipping = {
  async updateMarketplaceOrderShipping(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceOrderShipping)
    const marketplaceOrderShipping = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceOrderShipping,
      ...patch,
      updater: context.state.user
    })
  }
}