import { getRepository, In } from 'typeorm'
import { MarketplaceCategory } from '../../../entities'

export const deleteMarketplaceCategories = {
  async deleteMarketplaceCategories(_: any, { names }, context: any) {
    await getRepository(MarketplaceCategory).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

