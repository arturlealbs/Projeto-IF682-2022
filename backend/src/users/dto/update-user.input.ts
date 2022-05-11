/* eslint-disable @typescript-eslint/no-unused-vars */

import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { Education } from '../types/education';
import { Gender } from '../types/gender';
import { Interests } from '../types/interests';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ description: 'Profile image URL', nullable: true })
  profileImg?: string;

  @Field({ description: 'First part of full name', nullable: true })
  firstName?: string;

  @Field({ description: 'Last part of full name', nullable: true })
  lastName?: string;

  @Field((type) => Int, { description: "User's age", nullable: true })
  age?: number;

  @Field({ description: "User's description of himself", nullable: true })
  bio?: string;

  @Field((type) => Gender, { description: "User's gender", nullable: true })
  gender?: Gender;

  @Field({ description: "User's date of birth", nullable: true })
  birthDate?: string;

  @Field({ description: "User's city", nullable: true })
  city?: string;

  @Field({ description: "User's state", nullable: true })
  state?: string;

  @Field({
    description: "User's address (neighborhood, street, etc)",
    nullable: true,
  })
  address?: string;

  @Field((type) => [Interests], {
    description: "User's interests and hobbies",
    nullable: true,
  })
  interests?: Interests[];

  @Field((type) => Gender, {
    description: 'Genders of people that the user wants to meet',
    nullable: true,
  })
  genderOfInterest?: Gender;

  @Field({ description: "User's occupation", nullable: true })
  occupation?: string;

  @Field({ description: "User's phone number", nullable: true })
  phoneNumber?: string;

  @Field((type) => Education, {
    description: "User's level of education",
    nullable: true,
  })
  education?: Education;

  @Field((type) => [String], {
    description: 'Languages the user speaks',
    nullable: true,
  })
  languages?: string[];

  @Field((type) => [String], {
    description: 'List of e-mails of users who the user was liked',
    nullable: true,
  })
  usersLiked?: string[];

  @Field((type) => [String], {
    description: 'List of e-mails of users who the user disliked',
    nullable: true,
  })
  usersDisliked?: string[];
}
