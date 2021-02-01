import { User } from '../entities/user.entity';

export interface UserRepository {
  find(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  save(user: User): void;
  findBy(query: { [key: string]: any }): Promise<User>;
}
