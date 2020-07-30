import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { MarketplaceStoreProduct } from '../../../entities'

export const marketplaceStoreProductsResolver = {
  async marketplaceStoreProducts(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(MarketplaceStoreProduct).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}