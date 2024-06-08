import { UserEntity, CreateUserType, UpdateUserType } from '@/core/interfaces';
export default interface IUserRepository {
   findById(id: number): Promise<UserEntity | null>;
   create(user: CreateUserType): Promise<number | null>;
   findAll(): Promise<UserEntity[]>;
   update(user: UpdateUserType): Promise<UserEntity>;
   delete(id: number): Promise<void>;
}
