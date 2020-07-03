import { getRepository } from 'typeorm'
import { MarketplaceOrderItem } from '../../../entities'

export const updateMultipleMarketplaceOrderItem = {
    async updateMultipleMarketplaceOrderItem(_: any, { patches }, context: any) {
        let results = []
        const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
        const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
        const marketplaceOrderItemRepo = getRepository(MarketplaceOrderItem)
    
        if (_createRecords.length > 0) {
            for (let i = 0; i < _createRecords.length; i++) {
              const newRecord = _createRecords[i]
              
              const result = await marketplaceOrderItemRepo.save({
                ...newRecord,
                domain: context.state.domain,
                creator: context.state.user,
                updater: context.state.user,
              })
              
              results.push({ ...result, cuFlag: '+' })
            }
        }

        if (_updateRecords.length > 0) {
            for (let i = 0; i < _updateRecords.length; i++) {
              const newRecord = _updateRecords[i]
              const marketplaceOrderItem = await marketplaceOrderItemRepo.findOne(newRecord.id)
      
              const result = await marketplaceOrderItemRepo.save({
                ...marketplaceOrderItem,
                ...newRecord,
                updater: context.state.user
              })
      
              results.push({ ...result, cuFlag: 'M' })
            }
        }
      
        return results
    }
}

