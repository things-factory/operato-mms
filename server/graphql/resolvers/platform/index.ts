import { platformResolver } from './platform'
import { platformsResolver } from './platforms'

import { updatePlatform } from './update-platform'
import { updateMultiplePlatform } from './update-multiple-platform'
import { createPlatform } from './create-platform'
import { deletePlatform } from './delete-platform'
import { deletePlatforms } from './delete-platforms'

export const Query = {
  ...platformsResolver,
  ...platformResolver
}

export const Mutation = {
  ...updatePlatform,
  ...updateMultiplePlatform,
  ...createPlatform,
  ...deletePlatform,
  ...deletePlatforms
}
