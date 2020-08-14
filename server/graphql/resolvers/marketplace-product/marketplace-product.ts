import { getRepository } from 'typeorm'
import { Attachment } from '@things-factory/attachment-base'
import { MarketplaceProduct } from '../../../entities'
import { ATTACHMENT_TYPE } from '../../../constants'

export const marketplaceProductResolver = {
  async marketplaceProduct(_: any, { name, isku }, context: any) {
    const foundProd: MarketplaceProduct = await getRepository(MarketplaceProduct).findOne({
      where: { domain: context.state.domain, name, isku }
    })
    const foundAttachments: Attachment[] = await getRepository(Attachment).find({
      where: {
        domain: context.state.domain,
        refBy: foundProd.id,
        category: ATTACHMENT_TYPE.MARKETPLACE_PRODUCT
      }
    })
    return {
      ...foundProd,
      attachment: foundAttachments
    }
  }
}
