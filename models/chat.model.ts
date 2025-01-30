import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({description:"LLM chabot model"})

export class ChatModel{
    @Field({nullable:true, defaultValue:""})
    answer:string

    @Field({nullable:true, defaultValue:""})
    message:string
}