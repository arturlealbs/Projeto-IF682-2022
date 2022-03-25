/* eslint-disable @typescript-eslint/no-unused-vars */

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchUserInput {
  @Field({ description: 'Unique user e-mail', nullable: true })
  email?: string;

  @Field({ description: 'Unique user name to identify', nullable: true })
  username?: string;
}
