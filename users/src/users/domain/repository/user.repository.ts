import { User } from '../entities/user.entity';

export interface UserRepository {
  find(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  save(contract: User): void;
}
