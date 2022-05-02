import { RelationshipInput } from './relationship.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRelationshipInput extends PartialType(RelationshipInput) {
  @Field(() => Boolean, { nullable: false })
  blocked: boolean;
}
