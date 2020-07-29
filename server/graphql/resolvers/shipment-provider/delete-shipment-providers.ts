import { getRepository, In } from 'typeorm'
import { ShipmentProvider } from '../../../entities'

export const deleteShipmentProviders = {
  async deleteShipmentProviders(_: any, { names }, context: any) {
    await getRepository(ShipmentProvider).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

