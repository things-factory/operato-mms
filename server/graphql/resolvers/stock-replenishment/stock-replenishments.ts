import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { StockReplenishment } from '../../../entities'

export const stockReplenishmentsResolver = {
  async stockReplenishments(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(StockReplenishment).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}