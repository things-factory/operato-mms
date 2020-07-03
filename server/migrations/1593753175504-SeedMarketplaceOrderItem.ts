import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { MarketplaceOrderItem } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedMarketplaceOrderItem1593753175504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceOrderItem)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async marketplaceOrderItem => {
        await repository.save({
          ...marketplaceOrderItem,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceOrderItem)
    SEED.reverse().forEach(async marketplaceOrderItem => {
      let record = await repository.findOne({ name: marketplaceOrderItem.name })
      await repository.remove(record)
    })
  }
}
