import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SearchUserInput } from './dto/search-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('searchUserInput') searchUserInput: SearchUserInput) {
    if (searchUserInput.email == '' && searchUserInput.username == '') {
      throw new Error('You must provide either email or username');
    }
    return this.usersService.findOne(
      searchUserInput.email,
      searchUserInput.username,
    );
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(
      updateUserInput.email,
      updateUserInput.username,
      updateUserInput,
    );
  }

  @Mutation(() => User)
  removeUser(@Args('searchUserInput') searchUserInput: SearchUserInput) {
    if (searchUserInput.email == '' && searchUserInput.username == '') {
      throw new Error('You must provide either email or username');
    }
    return this.usersService.remove(
      searchUserInput.email,
      searchUserInput.username,
    );
  }
}
