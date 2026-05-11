import { EmailAlreadyExistsError } from 'src/core/domain/errors/user/email-already-exists.error';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { BaseUseCase } from 'src/core/shared/base.use-case';
import { LoggerPort } from 'src/core/shared/ports/logger.port';
import { fail, ok, Result } from 'src/core/shared/result';
import { CreateUserInputDto } from '../../dto/user/create-user.input.dto';
import { CreateUserOutputDto } from '../../dto/user/create-user.output.dto';

export class CreateUserUseCase extends BaseUseCase<
  CreateUserInputDto,
  CreateUserOutputDto,
  EmailAlreadyExistsError
> {
  constructor(
    private readonly userRepo: UserRepository,
    protected readonly logger?: LoggerPort,
  ) {
    super(logger);
  }

  protected async execute(
    input: CreateUserInputDto,
  ): Promise<Result<CreateUserOutputDto, EmailAlreadyExistsError>> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) return fail(new EmailAlreadyExistsError());

    const user = { id: crypto.randomUUID(), ...input };

    await this.userRepo.save(user);

    return ok({ id: user.id, email: user.email });
  }
}
