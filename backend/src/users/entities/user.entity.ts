/* eslint-disable @typescript-eslint/no-unused-vars */

import { ObjectType, Field, Int, createUnionType } from '@nestjs/graphql';
import { Education } from '../types/education';
import { UserError } from './error.entity';
import { Gender } from '../types/gender';

@ObjectType()
export class User {
  constructor({
    email,
    username,
    lastName,
    firstName,
    age,
    bio,
    city,
    state,
    gender,
    address,
    interests,
    workWith,
    birthDate,
    education,
    languages,
    phoneNumber,
    genderOfInterest,
  }: User) {
    this.email = email;
    this.username = username;
    this.lastName = lastName;
    this.firstName = firstName;
    this.age = age;
    this.bio = bio;
    this.city = city;
    this.state = state;
    this.gender = gender;
    this.address = address;
    this.interests = interests;
    this.workWith = workWith;
    this.birthDate = birthDate;
    this.education = education;
    this.languages = languages;
    this.phoneNumber = phoneNumber;
    this.genderOfInterest = genderOfInterest;
  }

  @Field({ description: 'Unique user e-mail' })
  email: string;

  @Field({ description: 'Unique user name to identify' })
  username: string;

  @Field({ description: 'First part of full name' })
  firstName: string;

  @Field({ description: 'Last part of full name' })
  lastName: string;

  @Field((type) => Int, { description: "User's age" })
  age: number;

  @Field({ description: "User's description of himself", nullable: true })
  bio?: string;

  @Field((type) => Gender, { description: "User's gender" })
  gender: Gender;

  @Field({ description: "User's date of birth" })
  birthDate: string;

  @Field({ description: "User's city" })
  city: string;

  @Field({ description: "User's state" })
  state: string;

  @Field({ description: "User's address (neighborhood, street, etc)" })
  address: string;

  @Field((type) => [String], { description: "User's interests and hobbies" })
  interests: string[];

  @Field((type) => [Gender], {
    description: 'Genders of people that the user wants to meet',
  })
  genderOfInterest: Gender[];

  @Field({ description: "User's occupation", nullable: true })
  workWith?: string;

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
}

export const UserOrError = createUnionType({
  name: 'UserOrError',
  types: () => [User, UserError] as const,
});
