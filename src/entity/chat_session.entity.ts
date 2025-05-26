import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ChatMessageEntity } from './chat_message.entity';



@Entity('chat_session')
export class ChatSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gen_sess_id: string;
  
  @Column()
  title: string;

  @OneToMany(() => ChatMessageEntity, (chatMessage) => chatMessage.chatSession)
  chatMessages: ChatMessageEntity[];

  
}