import { ZodValidationPipe } from '@nest/shared/pipes/zod-validation.pipe';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateUserInputDto,
  CreateUserSchema,
} from 'src/core/application/dto/user/create-user.input.dto';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user.usecase';
import { BaseController } from 'src/nest/shared/base.controller';

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserInputDto,
  ) {
    const result = await this.createUserUseCase.run(dto);
    return this.handle(result);
  }
}
