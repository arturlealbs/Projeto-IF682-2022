import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UpdateRelationshipInput } from './dto/update-relationship.input';
import { RelationshipInput } from './dto/relationship.input';
import { RelationshipsService } from './relationships.service';
import { Relationship } from './entities/relationship.entity';

import { JWTGuard } from '../guards/jwt.guard';
import TokenInfo from '../users/types/token-info';
import { Relation } from './entities/relations.entity';

@Resolver(() => Relationship)
export class RelationshipsResolver {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Mutation(() => Relationship)
  @UseGuards(JWTGuard)
  createRelationship(
    @Context('tokenInfo') tokenInfo: TokenInfo,
    @Args('contact') contact: string,
  ) {
    const input = {
      email: tokenInfo.email,
      contactEmail: contact,
    } as RelationshipInput;
    return this.relationshipsService.create(input);
  }

  @Query(() => [Relation], { name: 'relationships' })
  @UseGuards(JWTGuard)
  findAll(@Context('tokenInfo') tokenInfo: TokenInfo) {
    return this.relationshipsService.findAll(tokenInfo.email);
  }

  @Query(() => Relationship, { name: 'relationship' })
  @UseGuards(JWTGuard)
  findOne(
    @Context('tokenInfo') tokenInfo: TokenInfo,
    @Args('contact') contact: string,
  ) {
    const input = {
      email: tokenInfo.email,
      contactEmail: contact,
    } as RelationshipInput;
    return this.relationshipsService.findOne(input);
  }

  @Mutation(() => Relationship)
  @UseGuards(JWTGuard)
  updateRelationship(
    @Context('tokenInfo') tokenInfo: TokenInfo,
    @Args('updateRelationshipInput') input: UpdateRelationshipInput,
  ) {
    input.email = tokenInfo.email;
    return this.relationshipsService.update(input);
  }

  @Mutation(() => Relationship)
  @UseGuards(JWTGuard)
  removeRelationship(
    @Context('tokenInfo') tokenInfo: TokenInfo,
    @Args('contact') contact: string,
  ) {
    const input = {
      email: tokenInfo.email,
      contactEmail: contact,
    } as RelationshipInput;
    return this.relationshipsService.remove(input);
  }
}
