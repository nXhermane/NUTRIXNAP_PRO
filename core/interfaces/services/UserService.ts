import { UserEntity, UpdateUserType, CreateUserType } from "@/core/interfaces";
export default interface UserService {
   checkIfUserExist(): Promise<boolean>;
   getUserById(id: number): Promise<UserEntity | null>;
   getUser(): Promise<UserEntity | null>;
   getAllUser(): Promise<UserEntity[]>;
   updateUser(user: UpdateUserType): Promise<UserEntity>;
   createUser(user: CreateUserType): Promise<UserEntity | null>;
   deleteUser(id: number): Promise<void>;
}
