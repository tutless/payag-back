import { Column, Entity,ManyToOne,PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ChatSessionEntity } from './chat_session.entity';




@Entity("chat_messages")
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json', { name: 'chat_message', nullable: true})
  chat_message: Record<string, string>;

  @Column({ name: 'chat_session_id' })
  chatSessionId: number;

  @ManyToOne(() => ChatSessionEntity, (chatSession) => chatSession.chatMessages)
  @JoinColumn({ name: 'chat_session_id' })
  chatSession: ChatSessionEntity;

  
}

