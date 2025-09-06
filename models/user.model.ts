import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({"description":"User model"})
export class UserModel{
    @Field({nullable:false, defaultValue:0})
    id:number;
    @Field({nullable:true})
    providerId:string;
    @Field({nullable:false})
    email:string;
    @Field({nullable:true})
    password:string;
    @Field({nullable:true})
    firstName:string;
    @Field({nullable:true})
    lastName:string;
    @Field({nullable:true})
    picture:string;
}