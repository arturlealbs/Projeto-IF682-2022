import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SearchUserInput } from './dto/search-user.input';
import { User, UserDocument } from './schemas/user.schema';
import { RelationshipsService } from '../relationships/relationships.service';
import { LikeUserInput } from './dto/like-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private userModel: Model<UserDocument>,
    private relationshipService: RelationshipsService,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(searchUserInput: SearchUserInput): Promise<User[]> {
    const THRESHOLD = 0.5;
    const userLogged = await this.findOne({ email: searchUserInput.email });
    const { interests, usersLiked, usersDisliked } = userLogged;
    const min_interests = interests.length * THRESHOLD;
    const excludeList = [...usersLiked, ...usersDisliked];

    let userList = await this.userModel
      .find({
        $and: [
          {
            email: {
              $ne: searchUserInput.email,
            },
          },
          {
            email: {
              $nin: excludeList,
            },
          },
        ],
        usersDisliked: {
          $ne: searchUserInput.email,
        },
      })
      .exec();

    for (const user of userList) {
      const common_interests = user.interests.filter((i) =>
        interests.includes(i),
      );
      if (common_interests.length < min_interests) {
        userList = userList.filter((user) => user !== user);
      }
    }
    return userList;
  }

  findOne(searchUserInput: SearchUserInput): Promise<User> {
    if (searchUserInput.email) {
      return this.userModel.findOne({ email: searchUserInput.email }).exec();
    }
    return this.userModel
      .findOne({
        username: searchUserInput.username,
      })
      .exec();
  }

  async update(
    searchUserInput: SearchUserInput,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    this.userModel.findOneAndUpdate(searchUserInput, updateUserInput).exec();
    return this.userModel.findOne(searchUserInput).exec();
  }

  async likeUser(
    searchUserInput: SearchUserInput,
    likedUserInput: LikeUserInput,
  ): Promise<boolean> {
    const likedUser = await this.userModel.findOne(likedUserInput).exec();
    this.userModel
      .findOneAndUpdate(searchUserInput, {
        $push: {
          usersLiked: likedUserInput.email,
        },
      })
      .exec();
    if (likedUser.usersLiked.includes(searchUserInput.email)) {
      this.relationshipService.create({
        email: searchUserInput.email,
        contactEmail: likedUser.email,
      });
      return true;
    }
    return false;
  }

  remove(searchUserInput: SearchUserInput): Promise<User> {
    if (searchUserInput.email) {
      return this.userModel
        .findOneAndRemove({
          email: searchUserInput.email,
        })
        .exec();
    }
    return this.userModel
      .findOneAndRemove({
        username: searchUserInput.username,
      })
      .exec();
  }
}
