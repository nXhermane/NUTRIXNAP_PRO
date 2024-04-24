import { UserEntity, UpdateUserType, CreateUserType } from "@/core/interfaces";

export interface UserService {
  checkIfUserExist(): Promise<boolean>;
  getUserById(id: number): Promise<UserEntity | null>;
  getUser(): Promise<UserEntity | null>;
  getAllUsers(): Promise<UserEntity[]>;
  updateUser(user: UpdateUserType): Promise<UserEntity | null>;
  createUser(user: CreateUserType): Promise<UserEntity | null>;
  deleteUser(id: number): Promise<void>;
}

export class UserServiceImpl implements UserService {
  checkIfUserExist = async (): Promise<boolean> => {
    // implementation here
  };

  getUserById = async (id: number): Promise<UserEntity | null> => {
    // implementation here
  };

  getUser = async (): Promise<UserEntity | null> => {
    // implementation here
  };

  getAllUsers = async (): Promise<UserEntity[]> => {
    // implementation here
  };

  updateUser = async (user: UpdateUserType): Promise<UserEntity | null> => {
    // implementation here
  };

  createUser = async (user: CreateUserType): Promise<UserEntity | null> => {
    // implementation here
  };

  deleteUser = async (id: number): Promise<void> => {
    // implementation here
  };
}
