import { getRepository } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'

export const deleteMarketplaceProduct = {
  async deleteMarketplaceProduct(_: any, { name }, context: any) {
    await getRepository(MarketplaceProduct).delete({ domain: context.state.domain, name })
    return true
  }
}

