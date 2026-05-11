import { UserRepository } from '@core/domain/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { User } from '@core/domain/entities/user.entity';

export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email });
  }

  async save(user: User): Promise<void> {
    await this.repo.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}
