import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { MarketplaceProductCategory, MarketplaceProductVariation } from '../entities'
@Entity()
@Index(
  'ix_marketplace-product_0',
  (marketplaceProduct: MarketplaceProduct) => [marketplaceProduct.domain, marketplaceProduct.id],
  { unique: true }
)
@Index(
  'ix_marketplace-product_1',
  (marketplaceProduct: MarketplaceProduct) => [marketplaceProduct.name, marketplaceProduct.isku],
  { unique: true }
)
export class MarketplaceProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProductCategory, {
    nullable: true
  })
  marketplaceProductCategory: MarketplaceProductCategory

  @OneToMany(
    type => MarketplaceProductVariation,
    marketplaceProductVariation => marketplaceProductVariation.marketplaceProduct,
    {
      nullable: true
    }
  )
  marketplaceProductVariations: MarketplaceProductVariation[]

  @Column({
    nullable: true
  })
  itemId: string

  @Column()
  isku: String

  @Column()
  status: string

  @Column()
  name: string

  @Column()
  type: string

  @Column({
    nullable: true
  })
  description: string

  @Column({
    nullable: true
  })
  currency: string

  @Column({
    nullable: true
  })
  hasVariation: boolean

  @Column('float', {
    nullable: true
  })
  costPrice: number

  @Column('float', {
    nullable: true
  })
  mrpPrice: number

  @Column('float', {
    nullable: true
  })
  sellPrice: number

  @Column('float')
  weight: number

  @Column('float', {
    nullable: true
  })
  qty: number

  @Column({
    nullable: true
  })
  categoryId: number

  @Column('float')
  packageLength: number

  @Column('float')
  packageWidth: number

  @Column('float')
  packageHeight: number

  @Column('float', {
    nullable: true
  })
  afterTaxCostPrice: number

  @Column('float', {
    nullable: true
  })
  afterTaxSalesPrice: number

  @Column({
    nullable: true
  })
  condition: string

  @Column({
    nullable: true
  })
  daysToShip: number

  @Column({
    nullable: true
  })
  discountId: string

  @Column({
    nullable: true
  })
  isPreOrder: boolean

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
