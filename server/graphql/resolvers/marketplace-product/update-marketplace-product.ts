import { getRepository, getManager, EntityManager, Repository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { MarketplaceProduct } from '../../../entities'

export const updateMarketplaceProductResolver = {
  async updateMarketplaceProduct(_: any, { foundProduct, marketplaceProduct }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await updateMarketplaceProduct(
        context.state.domain,
        foundProduct,
        marketplaceProduct,
        context.state.user,
        trxMgr
      )
    })
  }
}

export async function updateMarketplaceProduct(
  domain: Domain,
  foundProduct: MarketplaceProduct,
  marketplaceProduct: any,
  user: User,
  trxMgr?: EntityManager
): Promise<any> {
  const marketplaceProdRepo: Repository<MarketplaceProduct> =
    trxMgr?.getRepository(MarketplaceProduct) || getRepository(MarketplaceProduct)

  await marketplaceProdRepo.save({
    ...foundProduct,
    ...marketplaceProduct,
    updater: user
  })
}
