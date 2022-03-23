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

  findOne(id: number): Promise<User> {
    const user = this.userModel.findOne({ id });
    return user.exec();
  }

  update(username: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = this.userModel.findOneAndUpdate(
      { username },
      updateUserInput,
      { new: true },
    );
    return user.exec();
  }

  remove(id: number): Promise<User> {
    return this.userModel.findOneAndRemove({ id }).exec();
  }
}
