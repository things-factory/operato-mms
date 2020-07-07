import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BizplacePlatform, Platform, MarketplaceProduct } from '../entities'
@Entity()
@Index(
  'ix_marketplace-product-category_0',
  (marketplaceProductCategory: MarketplaceProductCategory) => [
    marketplaceProductCategory.domain,
    marketplaceProductCategory.name
  ],
  { unique: true }
)
export class MarketplaceProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProduct)
  productId: MarketplaceProduct

  @ManyToOne(type => Platform)
  platformId: Platform

  @Column()
  name: string

  @Column()
  categoryId: string

  @Column()
  enabled: Boolean

  @ManyToOne(type => BizplacePlatform)
  bizplacePlatform: BizplacePlatform

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
