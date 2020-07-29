import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ShipmentProvider } from '../../../entities'

export const shipmentProvidersResolver = {
  async shipmentProviders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(ShipmentProvider).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}