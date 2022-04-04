import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import * as Schema from './schemas/user.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserError } from './entities/error.entity';
import { Education } from './types/education';
import { Gender } from './types/gender';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;
  const userInput: CreateUserInput = {
    email: 'test@email.com',
    username: 'test',
    gender: Gender.MALE,
    birthDate: '',
    address: '',
    state: '',
    city: '',
    age: 20,
    interest: [],
    lastName: '',
    workWith: '',
    firstName: '',
    genderOfInterest: [],
  };
  const mockUser: Schema.User = new User({
    username: 'test',
    email: 'test@email.com',
    gender: Gender.MALE,
    phoneNumber: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    workWith: '',
    address: '',
    state: '',
    city: '',
    age: 20,
    interest: [],
    languages: [],
    bio: undefined,
    genderOfInterest: [],
    education: Education.ensinoFundamental,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'users', schema: Schema.UserSchema },
        ]),
      ],
      providers: [UsersResolver, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    resolver = module.get<UsersResolver>(UsersResolver);
  });

  describe('createUser', () => {
    const spyFind = jest
      .spyOn(UsersService.prototype, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

    const spyCreate = jest
      .spyOn(UsersService.prototype, 'create')
      .mockImplementation(() => Promise.resolve(mockUser));

    it('create a new user', async () => {
      spyFind.mockClear().mockImplementation(() => Promise.resolve(null));

      const result = await resolver.createUser(userInput);

      expect(spyCreate).toHaveBeenCalledWith(userInput);
      expect(spyFind).toBeCalledTimes(2);
      expect(result).toStrictEqual(mockUser);
    });

    it('create duplicated e-mail', async () => {
      spyCreate.mockClear();
      spyFind.mockClear().mockImplementation(() => Promise.resolve(mockUser));

      const result = await resolver.createUser(userInput);
      const error = new UserError('Duplicated', 'E-mail already used');

      expect(spyCreate).toBeCalledTimes(0);
      expect(spyFind).toBeCalledTimes(1);
      expect(result).toStrictEqual(error);
    });

    it('create duplicated username', async () => {
      spyCreate.mockClear();
      spyFind.mockClear().mockImplementation(({ email }) => {
        return email ? null : Promise.resolve(mockUser);
      });

      const result = await resolver.createUser(userInput);
      const error = new UserError('Duplicated', 'Username already used');

      expect(spyCreate).toBeCalledTimes(0);
      expect(spyFind).toBeCalledTimes(2);
      expect(result).toStrictEqual(error);
    });
  });

  it('findAll', async () => {
    const spy = jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve([mockUser]));

    const result = await resolver.findAll();

    expect(spy).toHaveBeenCalled();
    expect(result).toEqual([mockUser]);
  });

  describe('findOne', () => {
    const spy = jest
      .spyOn(UsersService.prototype, 'findOne')
      .mockImplementation(() => Promise.resolve(mockUser));

    it('find user successfully', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(mockUser));
      const searchInput = {
        email: mockUser.email,
      };

      const result = await resolver.findOne(searchInput);

      expect(spy).toHaveBeenCalledWith(searchInput);
      expect(result).toEqual(mockUser);
    });

    it('fail to find user', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(null));
      const searchInput = {
        email: mockUser.username,
      };

      const result = await resolver.findOne(searchInput);
      const error = new UserError(
        'User not found',
        `User ${searchInput.email} undefined not found`,
      );

      expect(spy).toHaveBeenCalledWith(searchInput);
      expect(result).toEqual(error);
    });

    it('error on missing email and username', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(mockUser));

      const result = await resolver.findOne({});
      const error = new UserError(
        'Missing identifier',
        'You must provide either email or username',
      );

      expect(spy).toBeCalledTimes(0);
      expect(result).toEqual(error);
    });
  });

  describe('updateUser', () => {
    const spy = jest
      .spyOn(UsersService.prototype, 'update')
      .mockImplementation(() => Promise.resolve(mockUser));

    it('update user successfully', async () => {
      const updateInput = {
        email: mockUser.email,
        username: mockUser.username,
      };
      const updatedUser = mockUser;
      updatedUser.age = 30;

      const result = await resolver.updateUser(updatedUser);

      expect(spy).toHaveBeenCalledWith(updateInput, updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('fail to find user', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(null));
      const searchInput = {
        email: mockUser.username,
      };

      const result = await resolver.updateUser(searchInput);
      const error = new UserError(
        'User not found',
        `User ${searchInput.email} undefined not found`,
      );

      expect(spy).toHaveBeenCalledWith(searchInput, searchInput);
      expect(result).toEqual(error);
    });

    it('error on missing email and username', async () => {
      spy.mockClear();

      const result = await resolver.updateUser({});
      const error = new UserError(
        'Missing identifier',
        'You must provide either email or username',
      );

      expect(spy).toBeCalledTimes(0);
      expect(result).toEqual(error);
    });
  });

  describe('removeUser', () => {
    const spy = jest
      .spyOn(UsersService.prototype, 'remove')
      .mockImplementation(() => Promise.resolve(mockUser));

    it('deletes user successfully', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(mockUser));
      const removeInput = {
        email: mockUser.email,
        username: mockUser.username,
      };
      const result = await resolver.removeUser(removeInput);

      expect(spy).toHaveBeenCalledWith(removeInput);
      expect(result).toEqual(mockUser);
    });

    it('fail to find user', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(null));
      const searchInput = {
        email: mockUser.username,
      };

      const result = await resolver.removeUser(searchInput);
      const error = new UserError(
        'User not found',
        `User ${searchInput.email} undefined not found`,
      );

      expect(spy).toHaveBeenCalledWith(searchInput);
      expect(result).toEqual(error);
    });

    it('error on missing email and username', async () => {
      spy.mockClear();

      const result = await resolver.removeUser({});
      const error = new UserError(
        'Missing identifier',
        'You must provide either email or username',
      );

      expect(spy).toBeCalledTimes(0);
      expect(result).toEqual(error);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
