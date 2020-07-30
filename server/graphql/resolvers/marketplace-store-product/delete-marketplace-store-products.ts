import { getRepository, In } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const deleteMarketplaceStoreProducts = {
  async deleteMarketplaceStoreProducts(_: any, { names }, context: any) {
    await getRepository(MarketplaceStoreProduct).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

