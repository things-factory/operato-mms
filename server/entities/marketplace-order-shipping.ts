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
import { MarketplaceOrder } from '../entities'

@Entity()
@Index(
  'ix_marketplace-order-shipping_0',
  (marketplaceOrderShipping: MarketplaceOrderShipping) => [
    marketplaceOrderShipping.domain,
    marketplaceOrderShipping.name
  ],
  { unique: true }
)
export class MarketplaceOrderShipping {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceOrder)
  marketplacceOrder: MarketplaceOrder

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
