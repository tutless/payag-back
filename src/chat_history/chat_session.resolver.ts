import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatSessionEntity } from 'src/entity/chat_session.entity';
import { ChatHistoryService } from './chat_history.service';
import { ChatSessionInput } from 'dtos/chat_session.input';
import { ChatSessionModel } from 'models/chat_session.model';


@Resolver(of => ChatSessionModel)
export class ChatSessionResolver {
    constructor(private readonly charHistoryService: ChatHistoryService) {}

    @Query(returns => [ChatSessionModel])
    async chatSessions(): Promise<ChatSessionModel[]> {
        const allSessions = await this.charHistoryService.getAllChatSessions();
        return allSessions.map(sess => {
            const sessModel = new ChatSessionModel();
            sessModel.generated_session = sess.gen_sess_id;
            sessModel.title = sess.title;
            return sessModel;
        })
    }

    @Mutation(returns => ChatSessionModel)
    async createChatSession(@Args('chatsessionInput') chatsessionInput:ChatSessionInput): Promise<ChatSessionModel> {
        const newSession = await this.charHistoryService.createChatSession(chatsessionInput);
        const sessModel = new ChatSessionModel();
        sessModel.id = newSession.id;
        sessModel.generated_session = newSession.gen_sess_id;
        sessModel.title = newSession.title;
        return sessModel;
    }  
}
