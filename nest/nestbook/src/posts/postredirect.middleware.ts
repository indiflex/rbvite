import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PostredirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('****************redirect-mi>>', req.headers);
    if (req.headers['user-agent'] !== 'vscode-restclient')
      res.redirect('/api/0.2/users');
    else next();
  }
}
