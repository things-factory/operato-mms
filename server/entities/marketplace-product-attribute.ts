import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MarketplaceProduct, Platform } from '../entities'

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

  @Column()
  categoryId: string

  @ManyToOne(type => MarketplaceProduct)
  productId: MarketplaceProduct

  @ManyToOne(type => Platform)
  platformId: Platform

  @Column()
  attributeId: number

  @Column()
  attributeName: string

  @Column()
  isMandatory: boolean

  @Column()
  attributeType: string

  @Column()
  inputType: string

  @Column()
  options: string

  @Column()
  originalValue: string

  @Column()
  translateValue: string

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
