import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphqlModule } from './graphql/graphql.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    GraphqlModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
