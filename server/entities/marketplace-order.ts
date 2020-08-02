import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index(
  'ix_marketplace-order_0',
  (marketplaceOrder: MarketplaceOrder) => [marketplaceOrder.domain, marketplaceOrder.name],
  { unique: true }
)
export class MarketplaceOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  currency: string

  @Column({
    nullable: true
  })
  paymentMethod: string

  @Column({
    nullable: true
  })
  type: string

  @Column()
  trackingNo: string

  @Column({
    nullable: true
  })
  remark: string

  @Column({
    nullable: true
  })
  giftOption: Boolean

  @Column({
    nullable: true
  })
  voucherCode: string

  @Column()
  status: string

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
