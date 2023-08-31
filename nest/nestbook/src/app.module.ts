import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AService, BService } from './services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AService, BService],
})
export class AppModule {}
