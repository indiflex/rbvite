import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization)
      throw new UnauthorizedException('There is no token!!');

    const [, jwt] = req.headers.authorization.split('Bearer ');
    const { id, email } = this.authService.verifyToken(jwt);
    console.log('🚀  email:', email, id);

    return id > 0;
  }
}
