import { getRepository } from 'typeorm'
import { MarketplaceProductVariation } from '../../../entities'

export const deleteMarketplaceProductVariation = {
  async deleteMarketplaceProductVariation(_: any, { name }, context: any) {
    await getRepository(MarketplaceProductVariation).delete({ domain: context.state.domain, name })
    return true
  }
}

