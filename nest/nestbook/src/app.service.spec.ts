import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ttt', () => {
    expect(service.ttt()).toStrictEqual({ msg: 'ttt' });
  });
});
