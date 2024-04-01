import { UserEntity } from "@/core/interfaces";
export default interface UserService {
    checkIfUserExist(): Promise<boolean>;
    getUserById(id: number): Promise<UserEntity | null>;
    getUser(): Promise<UserEntity | null>;
    getAllUser(): Promise<UserEntity[]>;
    updateUser(user: UserEntity): Promise<number>;
    createUser(user: UserEntity): Promise<UserEntity>;
    deleteUser(id: number): Promise<void>;
}
