import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({description:"greeter"})
export class HelloReply{
    @Field({nullable:true})
    message:string
    
}