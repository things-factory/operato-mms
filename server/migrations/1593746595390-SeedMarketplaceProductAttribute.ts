import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { MarketplaceProductAttribute } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedMarketplaceProductAttribute1593746595390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceProductAttribute)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async marketplaceProductAttribute => {
        await repository.save({
          ...marketplaceProductAttribute,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceProductAttribute)
    SEED.reverse().forEach(async marketplaceProductAttribute => {
      let record = await repository.findOne({ name: marketplaceProductAttribute.name })
      await repository.remove(record)
    })
  }
}
