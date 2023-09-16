import { SuperEntity } from 'src/db/super.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Auth' })
export class Auth extends SuperEntity<Auth> {
  @Column({ length: 30 })
  authname: string;
}
