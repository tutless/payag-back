import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { createGrpcOption } from 'src/grpc-client.options';

@Module({
  providers: [ChatService, ChatResolver],
  imports:[

    ClientsModule.registerAsync([
      {
        name:"PAYAG_PKG",
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: (config:ConfigService) => createGrpcOption(config)
      }
    ]),

    // ClientsModule.register([
    //             {
    //                 name:"PAYAG_PKG",
    //                 ...grpcClientOptions,
    //             }
    //         ])
  ]

})
export class ChatModule {}
