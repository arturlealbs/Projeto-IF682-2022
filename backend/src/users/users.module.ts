import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { AuthService } from '../services/auth.service';
import { RelationshipsModule } from '../relationships/relationships.module';

@Module({
  imports: [
    HttpModule,
    RelationshipsModule,
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, AuthService],
})
export class UsersModule {}
