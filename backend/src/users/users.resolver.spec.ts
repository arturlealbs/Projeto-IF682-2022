import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from '../services/auth.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { CreateUserInput } from './dto/create-user.input';
import * as Schema from './schemas/user.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo';

import { UserError } from './entities/error.entity';
import { User } from './entities/user.entity';

import { Education } from './types/education';
import { Gender } from './types/gender';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  const EMAIL = 'test@email.com';
  const defaultTokenInfo = {
    email: EMAIL,
    auth: true,
    message: '',
  };

  const userInput: CreateUserInput = {
    email: EMAIL,
    username: 'test',
    profileImg: '',
    gender: Gender.MALE,
    birthDate: '',
    address: '',
    state: '',
    city: '',
    age: 20,
    interests: [],
    lastName: '',
    occupation: '',
    firstName: '',
    genderOfInterest: Gender.FEMALE,
  };
  const mockUser: Schema.User = new User({
    username: 'test',
    email: EMAIL,
    gender: Gender.MALE,
    phoneNumber: '',
    profileImg: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    occupation: '',
    address: '',
    state: '',
    city: '',
    age: 20,
    interests: [],
    languages: [],
    bio: undefined,
    genderOfInterest: Gender.FEMALE,
    education: Education.ensinoFundamental,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'users', schema: Schema.UserSchema },
        ]),
      ],
      providers: [UsersResolver, UsersService, AuthService],
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

      const result = await resolver.createUser(EMAIL, userInput);

      expect(spyCreate).toHaveBeenCalledWith(userInput);
      expect(spyFind).toBeCalledTimes(2);
      expect(result).toStrictEqual(mockUser);
    });

    it('create duplicated e-mail', async () => {
      spyCreate.mockClear();
      spyFind.mockClear().mockImplementation(() => Promise.resolve(mockUser));

      const result = await resolver.createUser(EMAIL, userInput);
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

      const result = await resolver.createUser(EMAIL, userInput);
      const error = new UserError('Duplicated', 'Username already used');

      expect(spyCreate).toBeCalledTimes(0);
      expect(spyFind).toBeCalledTimes(2);
      expect(result).toStrictEqual(error);
    });
  });

  describe('session', () => {
    it('must return a token', async () => {
      const result = await resolver.session('TOKEN', EMAIL);
      expect(result).toEqual({ token: 'TOKEN' });
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
      const result = await resolver.findOne(defaultTokenInfo);

      expect(spy).toHaveBeenCalledWith({ email: EMAIL });
      expect(result).toEqual(mockUser);
    });

    it('fail to find user', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(null));
      const tokenInfo = {
        email: 'EMAIL',
        auth: true,
        message: '',
      };

      const result = await resolver.findOne(tokenInfo);
      const error = new UserError(
        'User not found',
        `User ${tokenInfo.email} not found`,
      );

      expect(spy).toHaveBeenCalledWith({ email: 'EMAIL' });
      expect(result).toEqual(error);
    });
  });

  describe('updateUser', () => {
    const spy = jest
      .spyOn(UsersService.prototype, 'update')
      .mockImplementation(() => Promise.resolve(mockUser));

    it('update user successfully', async () => {
      const updatedUser = mockUser;
      updatedUser.age = 30;

      const result = await resolver.updateUser(defaultTokenInfo, updatedUser);

      expect(spy).toHaveBeenCalledWith({ email: EMAIL }, updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('fail to find user', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(null));
      const searchInput = {
        email: mockUser.username,
      };

      const result = await resolver.updateUser(defaultTokenInfo, searchInput);
      const error = new UserError(
        'User not found',
        `User ${defaultTokenInfo.email} not found`,
      );

      expect(spy).toHaveBeenCalledWith({ email: EMAIL }, searchInput);
      expect(result).toEqual(error);
    });
  });

  describe('removeUser', () => {
    const spy = jest
      .spyOn(UsersService.prototype, 'remove')
      .mockImplementation(() => Promise.resolve(mockUser));

    it('deletes user successfully', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(mockUser));
      const result = await resolver.removeUser(defaultTokenInfo);

      expect(spy).toHaveBeenCalledWith({ email: EMAIL });
      expect(result).toEqual(mockUser);
    });

    it('fail to find user', async () => {
      spy.mockClear().mockImplementation(() => Promise.resolve(null));

      const result = await resolver.removeUser(defaultTokenInfo);
      const error = new UserError(
        'User not found',
        `User ${defaultTokenInfo.email} not found`,
      );

      expect(spy).toHaveBeenCalledWith({ email: EMAIL });
      expect(result).toEqual(error);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
