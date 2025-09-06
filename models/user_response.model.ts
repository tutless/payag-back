import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType({description:'user response model'})
export class UserResponseModel {
    @Field(() => GraphQLJSONObject, {nullable: true})
    response: Record<string,string>;

  
}