import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Platform } from '../entities'

const SEED = [
  {
    name: 'amazon',
    countryCode: 'India'
  },
  {
    name: 'lazada',
    countryCode: 'Malaysia'
  },
  {
    name: 'lazada',
    countryCode: 'Singapore'
  },
  {
    name: 'zalora',
    countryCode: 'Malaysia'
  },
  {
    name: 'zalora',
    countryCode: 'Singapore '
  },
  {
    name: 'qoo10',
    countryCode: 'Singapore '
  },
  {
    name: 'shopclues',
    countryCode: 'Singapore '
  },
  {
    name: 'flipkart',
    countryCode: 'Singapore '
  },
  {
    name: 'snapdeal',
    countryCode: 'Singapore '
  }
]

export class SeedPlatform1593746532781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Platform)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async platform => {
        await repository.save({
          ...platform,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Platform)
    SEED.reverse().forEach(async platform => {
      let record = await repository.findOne({ name: platform.name })
      await repository.remove(record)
    })
  }
}
