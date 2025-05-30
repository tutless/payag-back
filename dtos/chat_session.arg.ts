import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BySessionId{
    @Field(() => Int)
    sessionId: number;
}