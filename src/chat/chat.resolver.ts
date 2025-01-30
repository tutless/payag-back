import { Args, Query, Resolver } from '@nestjs/graphql';
import { Sample } from 'models/sample.model';
import { ChatService } from './chat.service';
import { SampleArgs } from 'dtos/sample.args';
import { HelloRequest} from 'dtos/greeter.args';
import { HelloReply } from 'models/greeter.model';
import { Observable } from 'rxjs';
import { ChatModel} from 'models/chat.model';
import { ChatQuery } from 'dtos/chat.args';


@Resolver(of => ChatModel)
export class ChatResolver {
    constructor(private chatService:ChatService){}

    // @Query(returns => Sample)
    // sampleChat(@Args() sample:SampleArgs):Sample{
    //     const response = this.chatService.getAnswerFromServer(sample)
    //     return response
    // }
    @Query(returns => ChatModel)
    doGreet(@Args() data:HelloRequest):HelloReply{
        return this.chatService.greetingsFromServer(data)
    }

    @Query(returns => ChatModel)
    doChat(@Args() data:ChatQuery):ChatModel{
        return this.chatService.answerFromServer(data)
    }

    

    



}
