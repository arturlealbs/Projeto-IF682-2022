import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import toLowerIdentifier from './utils/lower-identifier';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SearchUserInput } from './dto/search-user.input';
import { User, UserOrError } from './entities/user.entity';
import { UserError } from './entities/error.entity';
import { UsersService } from './users.service';

@Resolver(() => UserOrError)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserOrError)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    createUserInput = toLowerIdentifier(createUserInput);

    const emailAlreadyUsed = await this.usersService.findOne({
      email: createUserInput.email,
    });

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

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserOrError, { name: 'user' })
  async findOne(@Args('searchUserInput') searchUserInput: SearchUserInput) {
    if (!searchUserInput.email && !searchUserInput.username) {
      return new UserError(
        'Missing identifier',
        'You must provide either email or username',
      );
    }
    searchUserInput = toLowerIdentifier(searchUserInput);

    const userFound = await this.usersService.findOne(searchUserInput);
    if (!userFound) {
      const input = `${searchUserInput.email} ${searchUserInput.username}`;
      return new UserError('User not found', `User ${input} not found`);
    }
    return new User(userFound);
  }

  @Mutation(() => UserOrError)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    if (!updateUserInput.email && !updateUserInput.username) {
      return new UserError(
        'Missing identifier',
        'You must provide either email or username',
      );
    }
    updateUserInput = toLowerIdentifier(updateUserInput);

    const identifiers = {};
    if (updateUserInput.email) {
      identifiers['email'] = updateUserInput.email;
    }
    if (updateUserInput.username) {
      identifiers['username'] = updateUserInput.username;
    }
    const updatedUser = await this.usersService.update(
      identifiers,
      updateUserInput,
    );
    if (!updatedUser) {
      const input = `${updateUserInput.email} ${updateUserInput.username}`;
      return new UserError('User not found', `User ${input} not found`);
    }
    return new User(updatedUser);
  }

  @Mutation(() => UserOrError)
  async removeUser(@Args('searchUserInput') searchUserInput: SearchUserInput) {
    if (!searchUserInput.email && !searchUserInput.username) {
      return new UserError(
        'Missing identifier',
        'You must provide either email or username',
      );
    }
    searchUserInput = toLowerIdentifier(searchUserInput);

    const removedUser = await this.usersService.remove(searchUserInput);
    if (!removedUser) {
      const input = `${searchUserInput.email} ${searchUserInput.username}`;
      return new UserError('User not found', `User ${input} not found`);
    }
    return new User(removedUser);
  }
}
