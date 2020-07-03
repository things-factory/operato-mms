import { getRepository } from 'typeorm'
import { MarketplaceProductCategory } from '../../../entities'

export const deleteMarketplaceProductCategory = {
  async deleteMarketplaceProductCategory(_: any, { name }, context: any) {
    await getRepository(MarketplaceProductCategory).delete({ domain: context.state.domain, name })
    return true
  }
}

