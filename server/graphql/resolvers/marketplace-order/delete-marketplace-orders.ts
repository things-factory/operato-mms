import { getRepository, In } from 'typeorm'
import { MarketplaceOrder } from '../../../entities'

export const deleteMarketplaceOrders = {
  async deleteMarketplaceOrders(_: any, { names }, context: any) {
    await getRepository(MarketplaceOrder).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

