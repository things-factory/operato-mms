import { getRepository, In } from 'typeorm'
import { MarketplaceOrderItem } from '../../../entities'

export const deleteMarketplaceOrderItems = {
  async deleteMarketplaceOrderItems(_: any, { names }, context: any) {
    await getRepository(MarketplaceOrderItem).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

