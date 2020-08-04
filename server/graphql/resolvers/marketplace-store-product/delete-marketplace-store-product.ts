import { getRepository } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const deleteMarketplaceStoreProduct = {
  async deleteMarketplaceStoreProduct(_: any, { id }, context: any) {
    await getRepository(MarketplaceStoreProduct).delete({ domain: context.state.domain, id })
    return true
  }
}
