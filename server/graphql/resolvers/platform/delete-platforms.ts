import { getRepository, In } from 'typeorm'
import { Platform } from '../../../entities'

export const deletePlatforms = {
  async deletePlatforms(_: any, { names }, context: any) {
    await getRepository(Platform).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

