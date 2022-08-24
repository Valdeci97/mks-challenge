import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { createdUser, createUserBody } from './mocks/createUser.mock';
import { findUser } from './mocks/findUser.mock';
import { updatedUser, updateUserBody } from './mocks/updateUser.mock';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(createdUser),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(findUser),
            findOneByOrFail: jest.fn().mockResolvedValue(findUser[0]),
            merge: jest.fn().mockReturnValue(updatedUser),
            softDelete: jest
              .fn()
              .mockResolvedValue({ affected: 1 } as ObjectLiteral),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Save', () => {
    it('should save a new user sucessfully', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);
      const result = await userService.save(createUserBody);
      expect(result).toBeDefined();
      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.create).toBeCalledWith(createUserBody);
      expect(userRepository.save).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledWith(createdUser);
    });
  });

  describe('Find', () => {
    it('should return an array with users', async () => {
      const result = await userService.find();
      expect(result).toBeDefined();
      expect(userRepository.find).toBeCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('should return an user', async () => {
      const result = await userService.findOne('abc34');
      expect(result).toBeDefined();
      expect(userRepository.findOneByOrFail).toBeCalledTimes(1);
      expect(userRepository.findOneByOrFail).toBeCalledWith({ id: 'abc34' });
    });
  });

  describe('Update', () => {
    it('should update an user successfully', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);
      const result = await userService.update('abc34', updateUserBody);
      expect(result).toBeDefined();
      expect(userRepository.findOneByOrFail).toBeCalledTimes(1);
      expect(userRepository.findOneByOrFail).toBeCalledWith({ id: 'abc34' });
      expect(userRepository.merge).toBeCalledTimes(1);
      expect(userRepository.merge).toBeCalledWith(createdUser, updateUserBody);
      expect(userRepository.save).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledWith(updatedUser);
    });
  });

  describe('Delete', () => {
    it('should delete an user sucessfully', async () => {
      const result = await userService.delete('abc34');
      expect(result).toBeUndefined();
      expect(userRepository.softDelete).toBeCalledTimes(1);
      expect(userRepository.softDelete).toBeCalledWith('abc34');
    });

    it('should return an exception', async () => {
      jest
        .spyOn(userRepository, 'softDelete')
        .mockRejectedValueOnce(new NotFoundException());
      expect(userService.delete('abc34')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
