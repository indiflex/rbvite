import { SuperEntity } from 'src/db/super.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Tag' })
export class Tag extends SuperEntity<Tag> {
  @Column({ length: 128, unique: true })
  tname: string;
}
