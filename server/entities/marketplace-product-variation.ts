import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MarketplaceProduct } from '../entities'
@Entity()
@Index(
  'ix_marketplace-product-variation_0',
  (marketplaceProductVariation: MarketplaceProductVariation) => [
    marketplaceProductVariation.domain,
    marketplaceProductVariation.id
  ],
  { unique: true }
)
export class MarketplaceProductVariation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProduct, marketplaceProduct => marketplaceProduct.marketplaceProductVariations)
  marketplaceProduct: MarketplaceProduct

  @Column()
  variationId: number

  @Column()
  isku: string

  @Column()
  channelSku: string

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column('float')
  qty: number

  @Column({
    nullable: true
  })
  bufferQty: number

  @Column({
    nullable: true
  })
  thresholdQty: number

  @Column()
  type: string

  @Column('float')
  mrpPrice: number

  @Column('float')
  costPrice: number

  @Column('float')
  sellPrice: number

  @Column()
  discountId: number

  @Column()
  status: string

  @Column('float')
  afterTaxCostPrice: number

  @Column('float')
  afterTaxSalesPrice: number

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
