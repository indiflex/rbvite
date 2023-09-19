import { SuperEntity } from 'src/db/super.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Post' })
export class Post extends SuperEntity<Post> {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'writer' })
  writer: User;
}
