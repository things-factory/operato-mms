import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const bizplacePlatformResolver = {
  async bizplacePlatform(_: any, { name }, context: any) {
    const repository = getRepository(BizplacePlatform)

    return await getRepository(BizplacePlatform).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

