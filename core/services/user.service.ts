import { IUserService, UserEntity, IUserRepository, UpdateUserType, CreateUserType } from '@/core/interfaces';

export default class UserService implements IUserService {
   constructor(private repository: IUserRepository) {}

   async checkIfUserExist(): Promise<boolean> {
      const user = await this.getAllUser();
      return user.length != 0 ? true : false;
   }
   async getUserById(id: number): Promise<UserEntity | null> {
      const user = await this.repository.findById(id);
      return user;
   }
   async getUser(): Promise<UserEntity | null> {
      const users = await this.getAllUser();
      return users[0];
   }
   async getAllUser(): Promise<UserEntity[]> {
      const users = await this.repository.findAll();
      return users;
   }
   async updateUser(user: UpdateUserType): Promise<UserEntity> {
      const upUser = await this.repository.update(user);

      return upUser;
   }

   async createUser(user: CreateUserType): Promise<UserEntity> {
      const id = await this.repository.create(user);
      return (await this.getUserById(id as number)) as UserEntity;
   }
   async deleteUser(id: number): Promise<void> {
      await this.repository.delete(id);
   }
}
