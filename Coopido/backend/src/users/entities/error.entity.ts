import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserError {
  constructor(title: string, reason: string) {
    this.title = title;
    this.reason = reason;
  }

  @Field({ description: 'The error title', nullable: true })
  title: string;

  @Field({ description: 'The error message', nullable: true })
  reason: string;
}
