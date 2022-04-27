import { ObjectType, Field, createUnionType } from '@nestjs/graphql';
import { UserError } from './error.entity';

@ObjectType()
export class Token {
  constructor(token: string) {
    this.token = token;
  }

  @Field({ description: 'Token string', nullable: false })
  token: string;
}

export const TokenOrError = createUnionType({
  name: 'TokenOrError',
  types: () => [Token, UserError] as const,
});
