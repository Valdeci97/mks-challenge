import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createUserBody, createdUser } from './mocks/createUser.mock';
import { findUser } from './mocks/findUser.mock';
import { updatedUser, updateUserBody } from './mocks/updateUser.mock';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            save: jest.fn().mockResolvedValue(createdUser),
            find: jest.fn().mockResolvedValue(findUser),
            findOne: jest.fn().mockResolvedValue(findUser[0]),
            update: jest.fn().mockResolvedValue(updatedUser),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Save', () => {
    it('should save a new user with sucess', async () => {
      const result = await userController.save(createUserBody);
      expect(result).toBeDefined();
      expect(userService.save).toBeCalledTimes(1);
      expect(userService.save).toBeCalledWith(createUserBody);
    });
  });

  describe('Find', () => {
    it('should return an array with users successfully', async () => {
      const result = await userController.find();
      expect(result).toBeDefined();
      expect(result.length).toStrictEqual(1);
      expect(userService.find).toBeCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('should return an user successfully', async () => {
      const result = await userController.findOne('abc34');
      expect(result).toBeDefined();
      expect(result.name).toStrictEqual('usuário teste');
      expect(userService.findOne).toBeCalledTimes(1);
      expect(userService.findOne).toBeCalledWith('abc34');
    });
  });

  describe('Update', () => {
    it('should update an user successfully', async () => {
      const result = await userController.udpate('abc34', updateUserBody);
      expect(result).toBeDefined();
      expect(result.name).not.toStrictEqual('usuário teste');
      expect(userService.update).toBeCalledTimes(1);
      expect(userService.update).toBeCalledWith('abc34', updateUserBody);
    });
  });

  describe('Delete', () => {
    it('should exclude an user successfully', async () => {
      const result = await userController.delete('abc34');
      expect(result).toBeUndefined();
      expect(userService.delete).toBeCalledTimes(1);
      expect(userService.delete).toBeCalledWith('abc34');
    });
  });
});
