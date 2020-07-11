import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Platform } from './platform'

@Entity()
@Index(
  'ix_bizplace-platform_0',
  (bizplacePlatform: BizplacePlatform) => [bizplacePlatform.domain, bizplacePlatform.name],
  { unique: true }
)
export class BizplacePlatform {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @ManyToOne(type => Platform)
  platform: Platform

  @Column()
  status: string

  @Column()
  name: string

  @Column()
  accessInfo: string

  @Column()
  accessToken: string

  @Column()
  refreshToken: string

  @Column()
  account: string

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
