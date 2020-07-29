import { getRepository } from 'typeorm'
import { ShipmentProvider } from '../../../entities'

export const createShipmentProvider = {
  async createShipmentProvider(_: any, { shipmentProvider}, context: any) {
    return await getRepository(ShipmentProvider).save({
      ...shipmentProvider,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

