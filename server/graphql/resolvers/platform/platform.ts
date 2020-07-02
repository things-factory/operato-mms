import { getRepository } from 'typeorm'
import { Platform } from '../../../entities'

export const platformResolver = {
  async platform(_: any, { name }, context: any) {
    const repository = getRepository(Platform)

    return await getRepository(Platform).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

