import { ShipmentProvider } from './shipment-provider'
import { NewShipmentProvider } from './new-shipment-provider'
import { ShipmentProviderPatch } from './shipment-provider-patch'
import { ShipmentProviderList } from './shipment-provider-list'

export const Mutation = `
  createShipmentProvider (
    shipmentProvider: NewShipmentProvider!
  ): ShipmentProvider

  updateShipmentProvider (
    name: String!
    patch: ShipmentProviderPatch!
  ): ShipmentProvider

  updateMultipleShipmentProvider (
    patches: [ShipmentProviderPatch]!
  ): [ShipmentProvider]

  deleteShipmentProvider (
    name: String!
  ): Boolean

  deleteShipmentProviders (
    names: [String]!
  ): Boolean
`

export const Query = `
  shipmentProviders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ShipmentProviderList
  shipmentProvider(name: String!): ShipmentProvider
`

export const Types = [ShipmentProvider, NewShipmentProvider, ShipmentProviderPatch, ShipmentProviderList]
