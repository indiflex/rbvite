import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from '../email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Addr } from './entities/addr.entity';
import { Auth } from './entities/auth.entity';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Addr, Auth])],
  controllers: [UsersController],
  providers: [UsersService, EmailService, UserSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
