import { EntityManager, getManager } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'
import { createMarketplaceProduct } from './create-marketplace-product'
import { updateMarketplaceProduct } from './update-marketplace-product'

export const upsertMarketplaceProduct = {
  async upsertMarketplaceProduct(_: any, { marketplaceProduct }, context: any) {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      let foundProduct: MarketplaceProduct
      foundProduct = await trxMgr.getRepository(MarketplaceProduct).findOne({
        where: { domain: context.state.domain, name: marketplaceProduct.name, isku: marketplaceProduct.isku }
      })

      if (foundProduct) {
        await updateMarketplaceProduct(
          context.state.domain,
          foundProduct,
          marketplaceProduct,
          context.state.user,
          trxMgr
        )
      } else {
        await createMarketplaceProduct(context.state.domain, marketplaceProduct, context.state.user, trxMgr)
      }
    })
  }
}
