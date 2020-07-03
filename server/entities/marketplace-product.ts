import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import {
  MarketplaceProductCategory,
  MarketplaceProductAttribute,
  MarketplaceProductVariation,
  MarketplaceCategory
} from '../entities'
@Entity()
@Index(
  'ix_marketplace-product_0',
  (marketplaceProduct: MarketplaceProduct) => [marketplaceProduct.domain, marketplaceProduct.name],
  { unique: true }
)
export class MarketplaceProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProductCategory)
  marketplaceProductCategory: MarketplaceProductCategory

  @OneToMany(
    type => MarketplaceProductVariation,
    marketplaceProductVariation => marketplaceProductVariation.marketplaceProduct
  )
  marketplaceProductVariations: MarketplaceProductVariation[]

  @OneToMany(
    type => MarketplaceProductAttribute,
    marketplaceProductAttribute => marketplaceProductAttribute.marketplaceProduct
  )
  marketplaceProductAttributes: MarketplaceProductAttribute[]
  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}
