import { getRepository } from 'typeorm'
import { Platform } from '../../../entities'

export const updatePlatform = {
  async updatePlatform(_: any, { name, patch }, context: any) {
    const repository = getRepository(Platform)
    const platform = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...platform,
      ...patch,
      updater: context.state.user
    })
  }
}