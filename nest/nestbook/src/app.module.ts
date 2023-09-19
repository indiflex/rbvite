import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AService, BService } from './services';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { DbModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';
import emailConfig from './config/email.config';
import baseConfig from './config/base.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: process.env.NODE_ENV === 'product' ? '.env' : '.local.env',
      envFilePath: ['.local.env', '.env.development', '.env'],
      expandVariables: true,
      load: [emailConfig, baseConfig],
      // cache: true,
    }),
    UsersModule,
    EmailModule,
    DbModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AService, BService],
})
export class AppModule {}
