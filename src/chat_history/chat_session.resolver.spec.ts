import { Test, TestingModule } from '@nestjs/testing';
import { ChatSessionResolver } from './chat_session.resolver';

describe('ChatSessionResolver', () => {
  let resolver: ChatSessionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSessionResolver],
    }).compile();

    resolver = module.get<ChatSessionResolver>(ChatSessionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
