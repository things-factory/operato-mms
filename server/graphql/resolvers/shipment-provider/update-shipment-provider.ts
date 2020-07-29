import { getRepository } from 'typeorm'
import { ShipmentProvider } from '../../../entities'

export const updateShipmentProvider = {
  async updateShipmentProvider(_: any, { name, patch }, context: any) {
    const repository = getRepository(ShipmentProvider)
    const shipmentProvider = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...shipmentProvider,
      ...patch,
      updater: context.state.user
    })
  }
}