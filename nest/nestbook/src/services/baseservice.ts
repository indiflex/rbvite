import { Inject } from '@nestjs/common';
import { AService } from './a.service';

export class BaseService {
  @Inject(AService)
  private readonly serviceA: AService;

  doSomething() {
    return this.serviceA.hello();
  }
}

/*
function BaseService() {
  sdfdsaf
}

BaseService.prototype.hello = function() {

}
*/
