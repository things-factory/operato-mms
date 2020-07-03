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
import { MarketplaceOrder, MarketplaceProductVariation } from '../entities'
@Entity()
@Index(
  'ix_marketplace-order-item_0',
  (marketplaceOrderItem: MarketplaceOrderItem) => [marketplaceOrderItem.domain, marketplaceOrderItem.name],
  { unique: true }
)
export class MarketplaceOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProductVariation)
  marketplaceProductVariation: MarketplaceProductVariation

  @ManyToOne(type => MarketplaceOrder)
  marketplaceOrder: MarketplaceOrder

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
