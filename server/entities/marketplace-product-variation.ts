import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MarketplaceProduct } from '../entities'
@Entity()
@Index(
  'ix_marketplace-product-variation_0',
  (marketplaceProductVariation: MarketplaceProductVariation) => [
    marketplaceProductVariation.domain,
    marketplaceProductVariation.name
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
  sku: string

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

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
