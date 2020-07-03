import { getRepository } from 'typeorm'
import { MarketplaceProductAttribute } from '../../../entities'

export const deleteMarketplaceProductAttribute = {
  async deleteMarketplaceProductAttribute(_: any, { name }, context: any) {
    await getRepository(MarketplaceProductAttribute).delete({ domain: context.state.domain, name })
    return true
  }
}

