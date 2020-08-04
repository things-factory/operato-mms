import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MarketplaceProduct } from '../entities'
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
  marketplaceProduct: MarketplaceProduct

  @Column()
  name: string

  @Column()
  categoryId: string

  @Column()
  childCategory: Boolean

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
