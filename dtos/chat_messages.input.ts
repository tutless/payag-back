import { Field, InputType, Int } from '@nestjs/graphql';
import {GraphQLJSONObject} from 'graphql-type-json';

@InputType()
export class ChatMessagesInput {
    @Field(type => Int)
    chatSessionId: number;
    @Field(() => GraphQLJSONObject, {nullable: true})
    chat_message: Record<string, string>;
  

}