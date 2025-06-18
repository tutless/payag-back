import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatHistoryService } from './chat_history.service';
import { ChatSessionInput } from 'dtos/chat_session.input';
import { ChatSessionModel } from 'models/chat_session.model';
import { ChatMessageModel } from 'models/chat_message.model';
import { BySessionId } from 'dtos/chat_session.arg';


@Resolver(of => ChatSessionModel)
export class ChatSessionResolver {
    constructor(private readonly charHistoryService: ChatHistoryService) {}

    @Query(returns => [ChatSessionModel])
    async chatSessions(): Promise<ChatSessionModel[]> {
        const allSessions = await this.charHistoryService.getAllChatSessions();
        return allSessions.map(sess => {
            const sessModel = new ChatSessionModel();
            sessModel.id = sess.id;
            sessModel.generated_session = sess.gen_sess_id;
            sessModel.title = sess.title;
            return sessModel;
        })
    }

    @Query(returns => [ChatSessionModel])
    async getAllChatSessionMessages(): Promise<ChatSessionModel[]> {
        const chatSession = await this.charHistoryService.getAllChatSessionAndMessages(); 
        return chatSession.map(sess => {
            const sessModel = new ChatSessionModel();
            sessModel.id = sess.id;
            sessModel.generated_session = sess.gen_sess_id;
            sessModel.title = sess.title
            sessModel.messages = sess.chatMessages.map(msg => {
                const msgModel = new ChatMessageModel();
                msgModel.id = msg.id;
                msgModel.sessId = msg.chatSession.id;
                msgModel.message = msg.chat_message;
                return msgModel;
            });
            
            
            return sessModel;
        })
    }

    @Query(returns => ChatSessionModel)
    async chatSessionById(@Args() sessParam: BySessionId): Promise<ChatSessionModel> {
        const chatSession = await this.charHistoryService.getChatSessionById(sessParam);
        const sessModel = new ChatSessionModel();
        sessModel.id = chatSession.id;
        sessModel.generated_session = chatSession.gen_sess_id;
        sessModel.title = chatSession.title;
        sessModel.messages = chatSession.chatMessages.map(msg => {
            const msgModel = new ChatMessageModel();
            msgModel.message = msg.chat_message;
            return msgModel;
        });
        return sessModel;
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

    @Mutation(returns => Boolean)
    async deleteChatSession(@Args() sessParam: BySessionId): Promise<boolean> {
        const result = await this.charHistoryService.deleteChatSession(sessParam);
        return result;
    }
}
