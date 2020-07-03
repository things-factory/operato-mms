import { getRepository } from 'typeorm'
import { MarketplaceOrder } from '../../../entities'

export const deleteMarketplaceOrder = {
  async deleteMarketplaceOrder(_: any, { name }, context: any) {
    await getRepository(MarketplaceOrder).delete({ domain: context.state.domain, name })
    return true
  }
}

