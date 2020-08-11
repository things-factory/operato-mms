import { getRepository, In } from 'typeorm'
import { StockReplenishment } from '../../../entities'

export const deleteStockReplenishments = {
  async deleteStockReplenishments(_: any, { names }, context: any) {
    await getRepository(StockReplenishment).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

