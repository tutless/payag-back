import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';


@Module({
    imports:[
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver:ApolloDriver,
            autoSchemaFile: join(__dirname, 'schema.gql'),
            subscriptions:{
                'graphql-ws':true
            },
            playground: true,
            path: '/graphql',
            context: ({ req }) => ({ req})
        })
    ]
})
export class GraphqlModule {}
