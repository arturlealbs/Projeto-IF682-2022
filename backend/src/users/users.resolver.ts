import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import toLowerIdentifier from './utils/lower-identifier';

import { Token, TokenOrError } from './entities/token.entity';
import { User, UserOrError } from './entities/user.entity';
import { UserError } from './entities/error.entity';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { FacebookGuard } from '../guards/facebook.guard';
import { UsersService } from './users.service';
import { JWTGuard } from '../guards/jwt.guard';
import TokenInfo from './types/token-info';

@Resolver(() => UserOrError)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserOrError)
  @UseGuards(FacebookGuard)
  async createUser(
    @Context('email') email: string,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<typeof UserOrError> {
    createUserInput = toLowerIdentifier(createUserInput);
    if (createUserInput.email !== email) {
      return new UserError(
        'Email mismatch',
        `Email ${createUserInput.email} does not match ${email}`,
      );
    }

    const emailAlreadyUsed = await this.usersService.findOne({ email });
    if (emailAlreadyUsed) {
      return new UserError('Duplicated', 'E-mail already used');
    }

    const usernameAlreadyUsed = await this.usersService.findOne({
      username: createUserInput.username,
    });
    if (usernameAlreadyUsed) {
      return new UserError('Duplicated', 'Username already used');
    }

    const userCreated = await this.usersService.create(createUserInput);
    return new User(userCreated);
  }

  @Query(() => TokenOrError, { name: 'session' })
  @UseGuards(FacebookGuard)
  async session(
    @Context('token') token: string,
    @Context('email') email: string,
  ) {
    const userFound = await this.usersService.findOne({
      email,
    });
    if (!userFound) {
      return new UserError('User not found', `User ${email} not found`);
    }
    return new Token(token);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserOrError, { name: 'user' })
  @UseGuards(JWTGuard)
  async findOne(@Context('tokenInfo') tokenInfo: TokenInfo) {
    const userFound = await this.usersService.findOne({
      email: tokenInfo.email,
    });

    if (!userFound) {
      return new UserError(
        'User not found',
        `User ${tokenInfo.email} not found`,
      );
    }
    return new User(userFound);
  }

  @Mutation(() => UserOrError)
  @UseGuards(JWTGuard)
  async updateUser(
    @Context('tokenInfo') tokenInfo: TokenInfo,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    updateUserInput = toLowerIdentifier(updateUserInput);

    const updatedUser = await this.usersService.update(
      { email: tokenInfo.email },
      updateUserInput,
    );
    if (!updatedUser) {
      return new UserError(
        'User not found',
        `User ${tokenInfo.email} not found`,
      );
    }
    return new User(updatedUser);
  }

  @Mutation(() => UserOrError)
  @UseGuards(JWTGuard)
  async removeUser(@Context('tokenInfo') tokenInfo: TokenInfo) {
    const removedUser = await this.usersService.remove({
      email: tokenInfo.email,
    });
    if (!removedUser) {
      return new UserError(
        'User not found',
        `User ${tokenInfo.email} not found`,
      );
    }
    return new User(removedUser);
  }
}
