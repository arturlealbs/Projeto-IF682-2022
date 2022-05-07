import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SearchUserInput } from './dto/search-user.input';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(searchUserInput: SearchUserInput): Promise<User[]> {
    // This can be done with a single query
    const userLogged = await this.findOne({ email: searchUserInput.email });
    const { interests } = userLogged;
    const interests_num = interests.length;
    const THRESHOLD = 0.5;

    let userList = await this.userModel.find().exec();

    for (const user of userList) {
      const common_interests = user.interests.filter((i) =>
        interests.includes(i),
      );
      if (common_interests.length < interests_num * THRESHOLD) {
        userList = userList.filter((user) => user !== user);
      }
    }
    userList = userList.filter(u => u.email != userLogged.email)
    console.log("USER LIST", userList)
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

  update(
    searchUserInput: SearchUserInput,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate(searchUserInput, updateUserInput, {
        new: true,
      })
      .exec();
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
