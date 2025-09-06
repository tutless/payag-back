import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { ChatQuery } from 'dtos/chat.args';
import { HelloRequest } from 'dtos/greeter.args';
import { GreetReply, GreetRequest } from 'dtos/greeter.type';
import { ChatModel } from 'models/chat.model';
import { HelloReply } from 'models/greeter.model';
import { Sample } from 'models/sample.model';
import { lastValueFrom, Observable } from 'rxjs';


interface PayagService{
    sayHello(data:HelloRequest):HelloReply;
    chat(data:ChatQuery):ChatModel;
}

@Injectable()
export class ChatService implements OnModuleInit{

    private payagService:PayagService;
    private token:string

    constructor(@Inject('PAYAG_PKG') private client:ClientGrpc){}

    onModuleInit() {
        this.payagService = this.client.getService<PayagService>('PayagService')
       console.log('Available RPC methods:', Object.keys(this.payagService));
    }

    setToken(token:string){
        this.token = token
    }

    private createMetadata(): Metadata {
        const metadata = new Metadata();
        metadata.add('Authorization', `Bearer ${this.token}`);
        return metadata;
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
        // const metadata = this.createMetadata();
        // return lastValueFrom(this.payagService.chat(data))
            
        
    }


   
}
