import { SuperEntity } from 'src/db/super.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Addr' })
export class Addr extends SuperEntity<Addr> {
  @Column()
  street: string;

  @Column({ length: 128 })
  detail: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn()
  user: User;

  @DeleteDateColumn()
  deletedAt: Date;
}
