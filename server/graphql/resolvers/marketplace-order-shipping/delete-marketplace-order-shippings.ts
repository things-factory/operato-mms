import { getRepository, In } from 'typeorm'
import { MarketplaceOrderShipping } from '../../../entities'

export const deleteMarketplaceOrderShippings = {
  async deleteMarketplaceOrderShippings(_: any, { names }, context: any) {
    await getRepository(MarketplaceOrderShipping).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

