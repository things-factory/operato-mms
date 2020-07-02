import { Platform } from './platform'
import { NewPlatform } from './new-platform'
import { PlatformPatch } from './platform-patch'
import { PlatformList } from './platform-list'

export const Mutation = `
  createPlatform (
    platform: NewPlatform!
  ): Platform

  updatePlatform (
    name: String!
    patch: PlatformPatch!
  ): Platform

  updateMultiplePlatform (
    patches: [PlatformPatch]!
  ): [Platform]

  deletePlatform (
    name: String!
  ): Boolean

  deletePlatforms (
    names: [String]!
  ): Boolean
`

export const Query = `
  platforms(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PlatformList
  platform(name: String!): Platform
`

export const Types = [Platform, NewPlatform, PlatformPatch, PlatformList]
