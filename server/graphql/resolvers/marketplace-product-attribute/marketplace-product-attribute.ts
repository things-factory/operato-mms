import { getRepository } from 'typeorm'
import { MarketplaceProductAttribute } from '../../../entities'

export const marketplaceProductAttributeResolver = {
  async marketplaceProductAttribute(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceProductAttribute)

    return await getRepository(MarketplaceProductAttribute).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

