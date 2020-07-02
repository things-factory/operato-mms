import { getRepository } from 'typeorm'
import { Platform } from '../../../entities'

export const deletePlatform = {
  async deletePlatform(_: any, { name }, context: any) {
    await getRepository(Platform).delete({ domain: context.state.domain, name })
    return true
  }
}

