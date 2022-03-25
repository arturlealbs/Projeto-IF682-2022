import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    const userList = this.userModel.find();
    return userList.exec();
  }

  findOne(email = '', username = ''): Promise<User> {
    if (email) {
      return this.userModel.findOne({ email }).exec();
    }
    return this.userModel.findOne({ username }).exec();
  }

  update(
    email = '',
    username = '',
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const identifier: { email?: string; username?: string } = {};
    if (email) {
      identifier['email'] = email;
    } else {
      identifier['username'] = username;
    }

    return this.userModel
      .findOneAndUpdate(identifier, updateUserInput, {
        new: true,
      })
      .exec();
  }

  remove(email = '', username = ''): Promise<User> {
    if (email) {
      return this.userModel.findOneAndRemove({ email }).exec();
    }
    return this.userModel.findOneAndRemove({ username }).exec();
  }
}
