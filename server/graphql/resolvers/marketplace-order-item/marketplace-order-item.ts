import { getRepository } from 'typeorm'
import { MarketplaceOrderItem } from '../../../entities'

export const marketplaceOrderItemResolver = {
  async marketplaceOrderItem(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceOrderItem)

    return await getRepository(MarketplaceOrderItem).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

