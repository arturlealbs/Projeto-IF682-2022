import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { RelationshipsService } from './relationships.service';
import { RelationshipsResolver } from './relationships.resolver';
import { RelationshipSchema } from './schemas/relationship.schema';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: 'relationships',
        schema: RelationshipSchema,
      },
    ]),
  ],
  providers: [RelationshipsResolver, RelationshipsService, AuthService],
  exports: [RelationshipsService],
})
export class RelationshipsModule {}
