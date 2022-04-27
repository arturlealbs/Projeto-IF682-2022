/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../test-utils/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as Schema from './schemas/user.schema';
import { Gender } from './types/gender';
import { CreateUserInput } from './dto/create-user.input';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser = {
    email: 'test@email.com',
    username: '',
    firstName: '',
    lastName: '',
    age: 0,
    gender: Gender.MALE,
    birthDate: '',
    city: '',
    state: '',
    address: '',
    interests: [],
    genderOfInterest: 'FEMALE',
  };
  class mockRepository {
    static findOne({ email }) {
      if (email) {
        return { exec: () => 'email: findOne' };
      }
      return { exec: () => 'username: findOne' };
    }
    static find() {
      return { exec: () => 'find' };
    }
    static findOneAndUpdate() {
      return { exec: () => 'findOneAndUpdate' };
    }
    static findOneAndRemove({ email }) {
      if (email) {
        return { exec: () => 'email: findOneAndRemove' };
      }
      return { exec: () => 'username: findOneAndRemove' };
    }

    constructor(_user: CreateUserInput) {
      return this;
    }
    save() {
      return 'save';
    }
    exec() {
      return 'exec';
    }
  }

  beforeEach(async () => {
    jest.mock('mongoose');
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'users', schema: Schema.UserSchema },
        ]),
      ],
      providers: [UsersService],
    })
      .overrideProvider(getModelToken('users'))
      .useValue(mockRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should call create function', async () => {
    const createNoteSpy = jest.spyOn(mockRepository.prototype, 'save');
    const result = service.create(mockUser);
    expect(createNoteSpy).toBeCalledTimes(1);
    expect(result).toBe('save');
  });

  it('should call findAll function', async () => {
    const result = service.findAll();
    expect(result).toBe('find');
  });

  it('should call findOne function', async () => {
    const result = service.findOne(mockUser);
    expect(result).toBe('email: findOne');

    const result2 = service.findOne({ username: 'test' });
    expect(result2).toBe('username: findOne');
  });

  it('should call findOneAndUpdate function', async () => {
    const result = service.update(mockUser, mockUser);
    expect(result).toBe('findOneAndUpdate');
  });

  it('should call findOneAndRemove function', async () => {
    const result = service.remove(mockUser);
    expect(result).toBe('email: findOneAndRemove');

    const result2 = service.remove({ username: 'test' });
    expect(result2).toBe('username: findOneAndRemove');
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
