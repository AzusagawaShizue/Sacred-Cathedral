import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { InventoryItem } from '../../game/entities/inventory-item.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  address: string;

  @Column({ default: 100 })
  spirit: number;

  @Column({ default: 100 })
  maxSpirit: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastSpiritReset: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => InventoryItem, (item) => item.user)
  inventory: InventoryItem[];
}
