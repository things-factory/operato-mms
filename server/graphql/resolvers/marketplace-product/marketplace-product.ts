import { getRepository } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'

export const marketplaceProductResolver = {
  async marketplaceProduct(_: any, { name, isku }, context: any) {
    return await getRepository(MarketplaceProduct).findOne({
      where: { domain: context.state.domain, name, isku },
      relations: ['domain', 'creator', 'updater']
    })
  }
}
