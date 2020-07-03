import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { MarketplaceProduct } from '../entities'
import { marketplaceProductAttributeResolver } from 'server/graphql/resolvers/marketplace-product-attribute/marketplace-product-attribute'

@Entity()
@Index(
  'ix_marketplace-product-attribute_0',
  (marketplaceProductAttribute: MarketplaceProductAttribute) => [
    marketplaceProductAttribute.domain,
    marketplaceProductAttribute.name
  ],
  { unique: true }
)
export class MarketplaceProductAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProduct, marketplaceProduct => marketplaceProduct.marketplaceProductAttributes)
  marketplaceProduct: MarketplaceProduct

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
