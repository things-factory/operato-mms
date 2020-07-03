import { getRepository } from 'typeorm'
import { MarketplaceOrderShipping } from '../../../entities'

export const deleteMarketplaceOrderShipping = {
  async deleteMarketplaceOrderShipping(_: any, { name }, context: any) {
    await getRepository(MarketplaceOrderShipping).delete({ domain: context.state.domain, name })
    return true
  }
}

