import { Test, TestingModule } from '@nestjs/testing';
import { ChatHistoryResolver } from './chat_history.resolver';

describe('ChatHistoryResolver', () => {
  let resolver: ChatHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatHistoryResolver],
    }).compile();

    resolver = module.get<ChatHistoryResolver>(ChatHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
