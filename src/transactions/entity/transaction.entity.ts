import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBalance } from '../../user-balance/entity/user-balance.entity';

@Entity({ name: 'transactions' })
export class UserTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserBalance)
  @JoinColumn({ name: 'userId' })
  userBalance: UserBalance;

  @Column({ type: 'integer' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
