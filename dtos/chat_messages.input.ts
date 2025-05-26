import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ChatMessagesInput {
    @Field(type => Int)
    chatSessionId: number;
    @Field()
    chat_message: string;
  

}