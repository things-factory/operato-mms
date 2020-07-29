import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index(
  'ix_shipment-provider_0',
  (shipmentProvider: ShipmentProvider) => [shipmentProvider.domain, shipmentProvider.name],
  { unique: true }
)
export class ShipmentProvider {
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
  isDefault: boolean

  @Column()
  apiIntegration: boolean

  @Column()
  trackingCodeExample: string

  @Column()
  trackingCodeValidationRegex: string

  @Column()
  cod: boolean

  @Column()
  trackingUrl: string

  @Column()
  deliveryOption: string

  @Column()
  account: string

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
