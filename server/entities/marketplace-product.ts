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
import { MarketplaceProductAttribute, MarketplaceProductCategory, MarketplaceProductVariation } from '../entities'
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
  itemId: number

  @Column('float')
  originalPrice: number

  @Column('float')
  currentPrice: number

  @Column()
  stock: number

  @Column()
  itemSku: string

  @Column('float')
  weight: number

  @Column()
  packageLength: number

  @Column()
  packageWidth: number

  @Column()
  packageHeight: number

  @Column()
  status: string

  @Column()
  currency: string

  @Column()
  categoryId: number

  @Column()
  shopId: number

  @Column()
  partnerId: number

  @Column()
  condition: string

  @Column()
  discountId: string

  @Column()
  isPreOrder: boolean
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
