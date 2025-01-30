import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { ChatQuery } from 'dtos/chat.args';
import { HelloRequest } from 'dtos/greeter.args';
import { GreetReply, GreetRequest } from 'dtos/greeter.type';
import { ChatModel } from 'models/chat.model';
import { HelloReply } from 'models/greeter.model';
import { Sample } from 'models/sample.model';
import { Observable } from 'rxjs';


interface PayagService{
    sayHello(data:HelloRequest):HelloReply;
    chat(data:ChatQuery):ChatModel;
}

@Injectable()
export class ChatService implements OnModuleInit{

    private payagService:PayagService;

    constructor(@Inject('PAYAG_PKG') private client:ClientGrpc){}

    onModuleInit() {
        this.payagService = this.client.getService<PayagService>('PayagService')
    }


    async getSampleAnswer(data:HelloRequest){
        return {
            answer: `you query is not officially comin from gRPC ${data.name}`
        } as Sample
    }

    
    
    greetingsFromServer(data:HelloRequest){
        
        return this.payagService.sayHello(data) 
    }

    answerFromServer(data:ChatQuery){
        return this.payagService.chat(data)
    }


   
}
