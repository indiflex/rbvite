import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AService, BService } from './services';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import emailConfig from './config/email.config';
import baseConfig from './config/base.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'product' ? '.env' : '.local.env',
      expandVariables: true,
      load: [emailConfig, baseConfig],
      // cache: true,
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, AService, BService],
})
export class AppModule {}
