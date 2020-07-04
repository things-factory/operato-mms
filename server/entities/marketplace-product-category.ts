import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BizplacePlatform, MarketplaceCategory } from '../entities'
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

  @Column()
  name: string

  @Column()
  enabled: Boolean

  @ManyToOne(type => BizplacePlatform)
  bizplacePlatform: BizplacePlatform

  @ManyToOne(type => MarketplaceCategory)
  marketplaceCategory: MarketplaceCategory

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
