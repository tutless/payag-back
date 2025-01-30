import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ChatQuery{
    @Field()
    query:string
}