import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';

@Module({
  providers: [ChatService, ChatResolver],
  imports:[
    ClientsModule.register([
                {
                    name:"PAYAG_PKG",
                    ...grpcClientOptions,
                }
            ])
  ]

})
export class ChatModule {}
