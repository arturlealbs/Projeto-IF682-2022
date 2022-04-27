import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { RelationshipsModule } from './relationships/relationships.module';
import { UsersModule } from './users/users.module';

import { AppGateway } from './app.gateway';
import { join } from 'path';

const envConfig = ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/graphql/**', '/messages/**'],
    }),
    envConfig,
    UsersModule,
    RelationshipsModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
