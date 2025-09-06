import { Module } from '@nestjs/common';
import { ChatHistoryService } from './chat_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageEntity } from 'src/entity/chat_message.entity';
import { ChatSessionEntity } from 'src/entity/chat_session.entity';
import { ChatMessageResolver } from './chat_message.resolver';
import { ChatSessionResolver } from './chat_session.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity, ChatSessionEntity]) // Add your entities here
  ],
  providers: [ChatHistoryService, ChatMessageResolver, ChatSessionResolver]
})
export class ChatHistoryModule {}
