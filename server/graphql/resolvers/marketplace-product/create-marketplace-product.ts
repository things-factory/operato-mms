import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { PRODUCT_STATUS } from '../../../constants'
import { MarketplaceProduct } from '../../../entities'

export const createMarketplaceProductResolver = {
  async createMarketplaceProduct(_: any, { marketplaceProduct }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await createMarketplaceProduct(context.state.domain, marketplaceProduct, context.state.user, trxMgr)
    })
  }
}

export async function createMarketplaceProduct(
  domain: Domain,
  marketplaceProduct: any,
  user: User,
  trxMgr?: EntityManager
): Promise<any> {
  const marketplaceProdRepo: Repository<MarketplaceProduct> =
    trxMgr?.getRepository(MarketplaceProduct) || getRepository(MarketplaceProduct)

  const createdProd: MarketplaceProduct = await marketplaceProdRepo.save({
    ...marketplaceProduct,
    domain,
    status: PRODUCT_STATUS.DRAFT,
    type: marketplaceProduct.storageType,
    creator: user,
    updater: user
  })

  return createdProd
}
