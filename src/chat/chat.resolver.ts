import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Sample } from 'models/sample.model';
import { ChatService } from './chat.service';
import { SampleArgs } from 'dtos/sample.args';
import { HelloRequest} from 'dtos/greeter.args';
import { HelloReply } from 'models/greeter.model';
import { Observable } from 'rxjs';
import { ChatModel} from 'models/chat.model';
import { ChatQuery } from 'dtos/chat.args';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guard/gql-auth.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';





@Resolver(of => ChatModel)
export class ChatResolver {
    constructor(private chatService:ChatService){}

    @Query(returns => ChatModel)
    doGreet(@Args() data:HelloRequest):HelloReply{
        return this.chatService.greetingsFromServer(data)
    }

 
    @Query(returns => ChatModel)
    @UseGuards(JwtAuthGuard)
    doChat(@Args() data:ChatQuery, @Context() req):ChatModel{
        // const token = ctx.req.headers.authorization.split(' ')[1];
        console.log('From resolver:', req.user);
        // this.chatService.setToken(token);
        return this.chatService.answerFromServer(data);
    }

    

    



}
