import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { MarketplaceProductAttribute } from '../../../entities'

export const marketplaceProductAttributesResolver = {
  async marketplaceProductAttributes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(MarketplaceProductAttribute).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}