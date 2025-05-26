import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({description: 'ChatMessages' })
export class ChatMessageModel {
    @Field({nullable:false, defaultValue:0})
    sessId: number;

    @Field({nullable:true, defaultValue:""})
    message: string;
}