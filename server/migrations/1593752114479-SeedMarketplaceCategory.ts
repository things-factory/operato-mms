import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { MarketplaceCategory } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedMarketplaceCategory1593752114479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceCategory)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async marketplaceCategory => {
        await repository.save({
          ...marketplaceCategory,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MarketplaceCategory)
    SEED.reverse().forEach(async marketplaceCategory => {
      let record = await repository.findOne({ name: marketplaceCategory.name })
      await repository.remove(record)
    })
  }
}
