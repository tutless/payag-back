import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatSessionInput{
    @Field()
    gen_sess_id: string;
    @Field()
    title: string;

}