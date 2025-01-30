import { ArgsType, Field } from '@nestjs/graphql';
@ArgsType()
export class SampleArgs{
    @Field()
    query:string
}