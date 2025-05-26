import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ChatHistoryService } from './chat_history.service';
import { ChatMessagesInput } from 'dtos/chat_messages.input';
import { ChatMessageModel } from 'models/chat_message.model';


@Resolver(of => ChatMessageModel)
export class ChatMessageResolver {
    constructor(private readonly chatMessageService: ChatHistoryService) {}

    @Query(returns => [ChatMessageModel])
    async chatMessages(): Promise<ChatMessageModel[]> {
        const allMessages = await this.chatMessageService.getAllChatMessages();
        return allMessages.map((message) => {
            const chatModel = new ChatMessageModel();
            chatModel.message = message.chat_message;
            return chatModel;
        })
    }

    @Mutation(returns => ChatMessageModel)
    async createChatMessage(@Args('chatMessageInput') chatMessageInput: ChatMessagesInput): Promise<ChatMessageModel> {
        const newMessage = await this.chatMessageService.createChatMessage(chatMessageInput);
        const chatModel = new ChatMessageModel();
        chatModel.message = newMessage.chat_message;
        chatModel.sessId = newMessage.chatSession.id;
        return chatModel
    }
   
}
