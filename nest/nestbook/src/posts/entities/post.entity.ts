import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Tag } from './tag.entity';
import { SuperEntity } from '../../db/super.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'Post' })
export class Post extends SuperEntity<Post> {
  @Column()
  title: string;

  @Column({ length: 2048, nullable: true, default: '냉무(제곧내)' })
  content: string;

  @ManyToOne(() => User, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'writer' })
  writer: User;

  @ManyToMany(() => Tag, { cascade: true, eager: true })
  @JoinTable({ name: 'PostTag' })
  tags: Tag[];
}
