import { ObjectType, Field } from '@nestjs/graphql';
import { UserInfo } from './user-info.entity';

@ObjectType()
export class Relation {
  @Field(() => [String], { description: 'Relationship e-mails' })
  contacts: string[];

  @Field(() => Boolean, { description: 'If was blocked or not' })
  blocked: boolean;

  @Field(() => [UserInfo], { description: 'Users information' })
  infos: UserInfo[];
}
