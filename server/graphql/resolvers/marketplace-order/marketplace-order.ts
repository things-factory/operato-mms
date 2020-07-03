import { getRepository } from 'typeorm'
import { MarketplaceOrder } from '../../../entities'

export const marketplaceOrderResolver = {
  async marketplaceOrder(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceOrder)

    return await getRepository(MarketplaceOrder).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

