import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { createGrpcOption } from 'src/grpc-client.options';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChatService, ChatResolver],
  imports:[
    AuthModule,
    ClientsModule.registerAsync([
      {
        name:"PAYAG_PKG",
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: (config:ConfigService) => createGrpcOption(config)
      }
    ]),

   
  ]

})
export class ChatModule {}
