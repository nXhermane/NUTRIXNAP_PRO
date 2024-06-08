import { UserEntity } from '@/core/interfaces';
export type CreateUserType = Omit<UserEntity, 'id' | 'unique_id'>;
export type UpdateUserType = { id: number } & Partial<Omit<UserEntity, 'id'>>;
