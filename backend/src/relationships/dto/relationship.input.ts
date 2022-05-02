import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RelationshipInput {
  @Field(() => String, { description: 'User e-mail' })
  email: string;

  @Field(() => String, { description: 'The relationship e-mail' })
  contactEmail: string;
}
