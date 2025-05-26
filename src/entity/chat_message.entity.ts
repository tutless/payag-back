import { Column, Entity,ManyToOne,PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ChatSessionEntity } from './chat_session.entity';




@Entity("chat_messages")
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chat_message: string;

  @ManyToOne(() => ChatSessionEntity, (chatSession) => chatSession.chatMessages)
  @JoinColumn({ name: 'chat_session_id' })
  chatSession: ChatSessionEntity;

  
}

