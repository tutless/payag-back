import { Field, ObjectType } from '@nestjs/graphql';
import { ChatMessageModel } from './chat_message.model';

@ObjectType({description:"Chat Session"})
export class ChatSessionModel {
    @Field({nullable:true, defaultValue:0})
    id: number
    @Field({nullable:true, defaultValue:""})
    generated_session:string

    @Field({nullable:true, defaultValue:""})
    title:string

    @Field(() => [ChatMessageModel], { nullable: "itemsAndList" })
    messages?: ChatMessageModel[];

   
}