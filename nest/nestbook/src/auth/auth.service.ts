import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  verifyToken(jwt: string) {
    const payload = <User>(
      verify(jwt, this.configService.getOrThrow('JWT_SECRET'))
    );
    const { id, email } = payload;
    return { id, email };
  }

  login(user: User) {
    const jwt = sign(user, this.configService.getOrThrow('JWT_SECRET'), {
      expiresIn: 60,
      issuer: 'app.com',
      audience: 'app.com',
    });
    console.log('🚀  jwt:', jwt);

    return jwt;
  }
}
