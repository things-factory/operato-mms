import { getRepository } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const deleteMarketplaceStoreProduct = {
  async deleteMarketplaceStoreProduct(_: any, { name }, context: any) {
    await getRepository(MarketplaceStoreProduct).delete({ domain: context.state.domain, name })
    return true
  }
}

