import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({description:"Chat Session"})
export class ChatSessionModel {
    @Field({nullable:false, defaultValue:0})
    id: number
    @Field({nullable:true, defaultValue:""})
    generated_session:string

    @Field({nullable:true, defaultValue:""})
    title:string

   
}