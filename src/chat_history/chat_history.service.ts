import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessagesInput } from 'dtos/chat_messages.input';
import { BySessionId } from 'dtos/chat_session.arg';
import { ChatSessionInput } from 'dtos/chat_session.input';
import { ChatMessageEntity } from 'src/entity/chat_message.entity';
import { ChatSessionEntity } from 'src/entity/chat_session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatHistoryService {
    constructor(
        @InjectRepository(ChatMessageEntity) private chatMessageRepository: Repository<ChatMessageEntity>,
        @InjectRepository(ChatSessionEntity) private chatSessionRepository: Repository<ChatSessionEntity>
    ) {}

    async getAllChatMessages(): Promise<ChatMessageEntity[]> {
        return this.chatMessageRepository.find();
    }

    async getChatMessageById(id: number): Promise<ChatMessageEntity> {
        return this.chatMessageRepository.findOne({ where: { id } });
    }

    async createChatMessage(chatMessage: ChatMessagesInput): Promise<ChatMessageEntity> {

        const chatSession = await this.chatSessionRepository.findOne({ where: { id: chatMessage.chatSessionId } });
         if (!chatSession) throw new NotFoundException('ChatSession not found');
        const chatEntity = this.chatMessageRepository.create({
            chat_message: chatMessage.chat_message,     
            chatSession
        });
        // ⬇️ Save the message to the database
        const saved_message = this.chatMessageRepository.save(chatEntity);
          // ⬇️ Now reload the message with chatSession relation included
        return this.chatMessageRepository.findOne({
            where: { id: (await saved_message).id },
            relations: ['chatSession'],
        });
    }

    async getAllChatSessions(): Promise<ChatSessionEntity[]> {
        return this.chatSessionRepository.find();       
    }

    async getAllChatSessionAndMessages(): Promise<ChatSessionEntity[]> {
        const chatSession = await this.chatSessionRepository.find({
            relations: ['chatMessages','chatMessages.chatSession'],
        });
        return chatSession
    }

    async getChatSessionById(id: BySessionId): Promise<ChatSessionEntity> {
        const chatSession = await this.chatSessionRepository.findOne({ where: { id: id.sessionId }, relations: ['chatMessages'] });
        if (!chatSession) throw new NotFoundException('ChatSession not found');
        return chatSession;
    }

    async createChatSession(chatSession: ChatSessionInput): Promise<ChatSessionEntity> {
        return this.chatSessionRepository.save(chatSession);
    }
    async deleteChatSession(id: BySessionId): Promise<boolean> {
        const chatSession = await this.chatSessionRepository.findOne({ where: { id: id.sessionId } });
        if (!chatSession) throw new NotFoundException('ChatSession not found');
        const deleteSession = await this.chatSessionRepository.remove(chatSession);
        return !!deleteSession;
    }


}