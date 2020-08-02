import { Entity, Index, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { MarketplaceProduct } from '../entities'
import { MarketplaceStore } from '@things-factory/marketplace-integration'

@Entity('marketplace_stores_products')
@Index(
  'ix_marketplace-store-product_0',
  (marketplaceStoreProduct: MarketplaceStoreProduct) => [marketplaceStoreProduct.marketplaceProduct],
  { unique: true }
)
export class MarketplaceStoreProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => MarketplaceProduct)
  marketplaceProduct: MarketplaceProduct

  @ManyToOne(type => MarketplaceStore)
  marketplaceStore: MarketplaceStore

  @Column()
  status: string
}
