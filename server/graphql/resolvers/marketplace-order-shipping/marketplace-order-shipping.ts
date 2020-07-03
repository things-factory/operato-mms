import { getRepository } from 'typeorm'
import { MarketplaceOrderShipping } from '../../../entities'

export const marketplaceOrderShippingResolver = {
  async marketplaceOrderShipping(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceOrderShipping)

    return await getRepository(MarketplaceOrderShipping).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

