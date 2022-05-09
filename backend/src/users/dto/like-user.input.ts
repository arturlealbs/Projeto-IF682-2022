import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LikeUserInput {
  @Field({ description: 'New e-mail user liked' })
  email: string;
}
