// import { SuperEntity } from 'src/db/super.entity';
// import { SuperEntity } from '../../db/super.entity';
// import { SuperEntity } from 'src/db/super.entity';
import { Column, Entity } from 'typeorm';
import { SuperEntity } from '../../db/super.entity';

@Entity({ name: 'Tag' })
export class Tag extends SuperEntity<Tag> {
  @Column({ length: 128, unique: true })
  tname: string;

  @Column({ nullable: true })
  ttt: number;
}
