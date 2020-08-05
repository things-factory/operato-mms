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

  @Column()
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

  @Column()
  currency: string

  @Column()
  hasVariation: boolean

  @Column('float')
  costPrice: number

  @Column('float')
  mrpPrice: number

  @Column('float')
  sellPrice: number

  @Column('float')
  weight: number

  @Column('float')
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

  @Column('float')
  afterTaxCostPrice: number

  @Column('float')
  afterTaxSalesPrice: number

  @Column({
    nullable: true
  })
  condition: string

  @Column()
  daysToShip: number

  @Column()
  discountId: string

  @Column()
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
