import { UserEntity } from "@/core/interfaces";
export default interface IUserRepository {
    findById(id: number): Promise<UserEntity | null>;
    create(user: UserEntity): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    update(user: UserEntity): Promise<UserEntity>;
    delete(id: number): Promise<void>;
}
