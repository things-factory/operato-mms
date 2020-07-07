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
  name: string

  @Column()
  variationId: number

  @Column()
  variationSku: string

  @Column('float')
  currentPrice: number

  @Column()
  stock: number

  @Column()
  status: string

  @Column('float')
  originalPrice: number

  @Column('float')
  unflatedOriginalPrice: number

  @Column('float')
  unflatedCurrentPrice: number

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
