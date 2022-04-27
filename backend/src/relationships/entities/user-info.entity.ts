/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from '@nestjs/graphql';
import { Gender } from '../../users/types/gender';

@ObjectType()
export class UserInfo {
  constructor(
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    profileImg: string,
    gender: Gender,
    bio: string,
  ) {
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileImg = profileImg;
    this.gender = gender;
    this.bio = bio;
  }

  @Field({ description: 'Unique user e-mail' })
  email: string;

  @Field({ description: 'Unique user name to identify' })
  username: string;

  @Field({ description: 'First part of full name' })
  firstName: string;

  @Field({ description: 'Last part of full name' })
  lastName: string;

  @Field({ description: 'Profile image URL' })
  profileImg: string;

  @Field({ description: "User's description of himself", nullable: true })
  bio?: string;

  @Field((type) => Gender, { description: "User's gender" })
  gender: Gender;
}
