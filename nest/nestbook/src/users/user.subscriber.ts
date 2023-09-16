import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './entities/user.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly logger = new Logger(UserSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    event.entity.passwd += '!!!';
    this.logger.log(`User.beforeInsert>> ${jj(event.entity)}`);
  }

  afterInsert(event: InsertEvent<User>) {
    // event.entity.passwd = '';
    this.logger.log(`User.afterInsert>> ${jj(event.entity)}`);

    // Todo: send email verification!!
  }
}

function jj(obj) {
  return JSON.stringify(obj, null, 2);
}
