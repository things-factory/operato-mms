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
import { Platform } from '../entities'

@Entity()
@Index(
  'ix_marketplace-category_0',
  (marketplaceCategory: MarketplaceCategory) => [marketplaceCategory.domain, marketplaceCategory.name],
  { unique: true }
)
export class MarketplaceCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Platform)
  platform: Platform

  @ManyToOne(type => MarketplaceCategory)
  marketplaceCategory: MarketplaceCategory

  @Column()
  name: string

  @Column({
    nullable: true
  })
  parentId: string

  @Column({
    nullable: true
  })
  hasChildren: Boolean

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
