import { getRepository, In } from 'typeorm'
import { MarketplaceProductVariation } from '../../../entities'

export const deleteMarketplaceProductVariations = {
  async deleteMarketplaceProductVariations(_: any, { names }, context: any) {
    await getRepository(MarketplaceProductVariation).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

