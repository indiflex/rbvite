// src/typeOrm.config.ts
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Tag } from './posts/entities/tag.entity';

config({ path: '.local.env' });
config({ path: '.env' });
const configService = new ConfigService();
// console.log('vvvvvvvv>>', configService.get('VERSION'));

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.get('DB_PORT') || 3306,
  database: configService.get('DB_NAME') || 'mydb',
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWD'),
  synchronize: false,
  migrations: ['migrations/**'],
  entities: [Tag], // ['src/*/entities/*.entity.ts']
});
