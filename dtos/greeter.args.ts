import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class HelloRequest{
    @Field()
    name:string
}