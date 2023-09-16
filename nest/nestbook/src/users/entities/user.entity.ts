import { SuperEntity } from 'src/db/super.entity';
import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Addr } from './addr.entity';
import { Auth } from './auth.entity';

@Entity({ name: 'User' })
export class User extends SuperEntity<User> {
  @Column()
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 128 })
  passwd: string;

  @OneToOne(() => Profile, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Addr, (addr) => addr.user, { cascade: true })
  addrs: Addr[];

  @ManyToMany(() => Auth, { cascade: true })
  @JoinTable({ name: 'UserAuth' })
  auths: Auth[];

  @AfterInsert()
  afterUserInsert() {
    this.passwd = '';
  }
}
