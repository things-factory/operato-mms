import { getRepository } from 'typeorm'
import { MarketplaceOrderItem } from '../../../entities'

export const deleteMarketplaceOrderItem = {
  async deleteMarketplaceOrderItem(_: any, { name }, context: any) {
    await getRepository(MarketplaceOrderItem).delete({ domain: context.state.domain, name })
    return true
  }
}

