import { getRepository, In } from 'typeorm'
import { MarketplaceProductAttribute } from '../../../entities'

export const deleteMarketplaceProductAttributes = {
  async deleteMarketplaceProductAttributes(_: any, { names }, context: any) {
    await getRepository(MarketplaceProductAttribute).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

