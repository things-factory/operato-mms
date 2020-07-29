import { getRepository } from 'typeorm'
import { ShipmentProvider } from '../../../entities'

export const deleteShipmentProvider = {
  async deleteShipmentProvider(_: any, { name }, context: any) {
    await getRepository(ShipmentProvider).delete({ domain: context.state.domain, name })
    return true
  }
}

