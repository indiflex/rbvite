import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow('DB_HOST'),
        port: config.get('DB_PORT') || 3306,
        database: config.get('DB_NAME') || 'mydb',
        username: config.getOrThrow('DB_USER'),
        password: config.getOrThrow('DB_PASSWD'),
        synchronize: config.getOrThrow('DB_SYNC'),
        autoLoadEntities: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
