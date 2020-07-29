import { shipmentProviderResolver } from './shipment-provider'
import { shipmentProvidersResolver } from './shipment-providers'

import { updateShipmentProvider } from './update-shipment-provider'
import { updateMultipleShipmentProvider } from './update-multiple-shipment-provider'
import { createShipmentProvider } from './create-shipment-provider'
import { deleteShipmentProvider } from './delete-shipment-provider'
import { deleteShipmentProviders } from './delete-shipment-providers'

export const Query = {
  ...shipmentProvidersResolver,
  ...shipmentProviderResolver
}

export const Mutation = {
  ...updateShipmentProvider,
  ...updateMultipleShipmentProvider,
  ...createShipmentProvider,
  ...deleteShipmentProvider,
  ...deleteShipmentProviders
}
