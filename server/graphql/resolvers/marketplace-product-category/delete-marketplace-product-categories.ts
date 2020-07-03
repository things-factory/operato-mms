import { getRepository, In } from 'typeorm'
import { MarketplaceProductCategory } from '../../../entities'

export const deleteMarketplaceProductCategories = {
  async deleteMarketplaceProductCategories(_: any, { names }, context: any) {
    await getRepository(MarketplaceProductCategory).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

