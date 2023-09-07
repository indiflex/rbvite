import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v1 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  private tokenMap = new Map<string, string>();

  constructor(
    private readonly config: ConfigService,
    private readonly emailService: EmailService,
  ) {
    const { TTT, PPP } = process.env;
    console.log(
      '🚀  TTT:',
      TTT,
      PPP,
      '::',
      config.get('emailOptions'),
      this.config.get('Port'),
    );
  }
  create(createUserDto: CreateUserDto) {
    console.log('🚀  createUserDto:', createUserDto);
    const token = v1();
    this.tokenMap.set(createUserDto.email, token);
    this.emailService.sendMail(createUserDto.email, token);
    return 'This action adds a new user';
  }

  verifyToken(email: string, token: string) {
    console.log('🚀  token:', token, this.tokenMap.get(email));
    return token === this.tokenMap.get(email);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
