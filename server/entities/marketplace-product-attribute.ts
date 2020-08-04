import { User } from '@things-factory/auth-base'
import { MarketplaceStore } from '@things-factory/marketplace-integration'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MarketplaceProduct } from '../entities'

@Entity()
@Index(
  'ix_marketplace-product-attribute_0',
  (marketplaceProductAttribute: MarketplaceProductAttribute) => [
    marketplaceProductAttribute.domain,
    marketplaceProductAttribute.id
  ],
  { unique: true }
)
export class MarketplaceProductAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProduct)
  marketplaceProduct: MarketplaceProduct

  @Column()
  attributeId: number

  @Column()
  name: string

  @Column()
  isMandatory: boolean

  @Column()
  attributeType: string

  @Column()
  option: string

  @Column()
  originalValue: string

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
