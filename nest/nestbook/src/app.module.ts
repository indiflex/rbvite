import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { Logger2Middleware } from './logger/logger2.middleware';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PostsController } from './posts/posts.controller';
import { PostredirectMiddleware } from './posts/postredirect.middleware';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';

const WINSTON_OTIONS = {
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    utilities.format.nestLike('APP', { prettyPrint: true, colors: true }),
  ),
};

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
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          ...WINSTON_OTIONS,
          level: process.env.LOGGER_LEVEL || 'info',
        }),
        new winston.transports.File({
          ...WINSTON_OTIONS,
          dirname: `./log/`,
          filename: 'sbm.log',
          level: process.env.LOGGER_LEVEL || 'info',
        }),
      ],
    }),
    UsersModule,
    EmailModule,
    DbModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AService, BService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Logger2Middleware, LoggerMiddleware)
      .exclude({ path: '/api/:version/posts/tags', method: RequestMethod.GET })
      .forRoutes(PostsController);
    // .forRoutes('/api/*/posts');

    consumer.apply(PostredirectMiddleware).forRoutes(PostsController);
  }
}
