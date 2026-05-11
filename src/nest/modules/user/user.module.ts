import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user.usecase';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { LOGGER_PORT, LoggerPort } from 'src/core/shared/ports/logger.port';
import { UserController } from './user.controller';
import { TOKENS } from 'src/nest/shared/tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '@infra/database/postgres/entities/user.orm-entity';
import { UserTypeormRepository } from '@infra/database/postgres/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    { provide: TOKENS.UserRepository, useClass: UserTypeormRepository },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepository, logger: LoggerPort) => {
        return new CreateUserUseCase(userRepo, logger);
      },
      inject: [TOKENS.UserRepository, LOGGER_PORT],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
