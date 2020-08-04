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
import { MarketplaceStore } from '@things-factory/marketplace-integration'
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

  @Column()
  itemId: string

  @Column('float', {
    nullable: true
  })
  originalPrice: number

  @Column('float', {
    nullable: true
  })
  currentPrice: number

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

  @Column({
    nullable: true
  })
  status: string

  @Column({
    nullable: true
  })
  currency: string

  @Column({
    nullable: true
  })
  categoryId: number

  @Column({
    nullable: true
  })
  shopId: number

  @Column({
    nullable: true
  })
  partnerId: number

  @Column({
    nullable: true
  })
  condition: string

  @Column({
    nullable: true
  })
  discountId: string

  @Column({
    nullable: true
  })
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
