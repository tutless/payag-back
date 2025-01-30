import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({description:'sample'})
export class Sample{
    @Field({nullable:true})
    answer:string
}