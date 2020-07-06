import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
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
  marketplaceOrder: MarketplaceOrder

  @Column()
  name: string

  @Column()
  address1: string

  @Column()
  address2: string

  @Column()
  address3: string

  @Column()
  address4: string

  @Column()
  address5: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  city: string

  @Column()
  postCode: string

  @Column()
  country: string

  @Column()
  phone1: string

  @Column()
  phone2: string

  @Column()
  type: string

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
