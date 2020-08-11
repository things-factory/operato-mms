import { EntityManager, getManager } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'
import { Attachment, createAttachments } from '@things-factory/attachment-base'
import { ATTACHMENT_TYPE } from '../../../constants'
import { createMarketplaceProduct } from './create-marketplace-product'
import { updateMarketplaceProduct } from './update-marketplace-product'

export const upsertMarketplaceProduct = {
  async upsertMarketplaceProduct(_: any, { marketplaceProduct, file }, context: any) {
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
        const foundProd: MarketplaceProduct = await createMarketplaceProduct(
          context.state.domain,
          marketplaceProduct,
          context.state.user,
          trxMgr
        )

        if (file?.length) {
          const attachments: Attachment[] = file.map(attachment => {
            return {
              file: attachment,
              refBy: foundProd.id,
              category: ATTACHMENT_TYPE.MARKETPLACE_PRODUCT
            }
          })
          await createAttachments(_, { attachments }, context)
        }
      }
    })
  }
}
