import { getRepository } from 'typeorm'
import { ShipmentProvider } from '../../../entities'

export const shipmentProviderResolver = {
  async shipmentProvider(_: any, { name }, context: any) {
    const repository = getRepository(ShipmentProvider)

    return await getRepository(ShipmentProvider).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

