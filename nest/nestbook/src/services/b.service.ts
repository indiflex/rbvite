import { BaseService } from './baseservice';

export class BService extends BaseService {
  hello() {
    return this.doSomething();
  }
}
