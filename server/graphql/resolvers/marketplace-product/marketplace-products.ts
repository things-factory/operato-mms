import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { MarketplaceProduct } from '../../../entities'

export const marketplaceProductsResolver = {
  async marketplaceProducts(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(MarketplaceProduct).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}