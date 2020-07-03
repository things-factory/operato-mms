import { getRepository, In } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'

export const deleteMarketplaceProducts = {
  async deleteMarketplaceProducts(_: any, { names }, context: any) {
    await getRepository(MarketplaceProduct).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

