import { SuperEntity } from 'src/db/super.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Profile' })
export class Profile extends SuperEntity<Profile> {
  @Column({ nullable: true })
  photo: string;

  @Column({ default: 0 })
  role: number;

  @OneToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;
}
