import { getRepository } from 'typeorm'
import { Platform } from '../../../entities'

export const createPlatform = {
  async createPlatform(_: any, { platform}, context: any) {
    return await getRepository(Platform).save({
      ...platform,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

