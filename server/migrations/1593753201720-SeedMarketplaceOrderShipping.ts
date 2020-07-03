import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { MarketplaceOrderShipping } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedMarketplaceOrderShipping1593753201720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceOrderShipping)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async marketplaceOrderShipping => {
        await repository.save({
          ...marketplaceOrderShipping,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceOrderShipping)
    SEED.reverse().forEach(async marketplaceOrderShipping => {
      let record = await repository.findOne({ name: marketplaceOrderShipping.name })
      await repository.remove(record)
    })
  }
}
