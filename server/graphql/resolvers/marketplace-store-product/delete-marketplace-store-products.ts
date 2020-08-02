import { getRepository, In } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const deleteMarketplaceStoreProducts = {
  async deleteMarketplaceStoreProducts(_: any, { ids }, context: any) {
    await getRepository(MarketplaceStoreProduct).delete({
      domain: context.state.domain,
      id: In(ids)
    })
    return true
  }
}
