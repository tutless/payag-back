import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType({description: 'ChatMessages' })
export class ChatMessageModel {
    @Field({nullable:false, defaultValue:0})
    id: number
    @Field({nullable:false, defaultValue:0})
    sessId: number;

    @Field(() => GraphQLJSONObject, {nullable: true})
    message: Record<string, string>;
}