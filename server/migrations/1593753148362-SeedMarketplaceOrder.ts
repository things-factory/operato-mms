import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { MarketplaceOrder } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedMarketplaceOrder1593753148362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceOrder)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async marketplaceOrder => {
        await repository.save({
          ...marketplaceOrder,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceOrder)
    SEED.reverse().forEach(async marketplaceOrder => {
      let record = await repository.findOne({ name: marketplaceOrder.name })
      await repository.remove(record)
    })
  }
}
