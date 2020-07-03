import { getRepository } from 'typeorm'
import { MarketplaceCategory } from '../../../entities'

export const deleteMarketplaceCategory = {
  async deleteMarketplaceCategory(_: any, { name }, context: any) {
    await getRepository(MarketplaceCategory).delete({ domain: context.state.domain, name })
    return true
  }
}

