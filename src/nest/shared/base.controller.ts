import { HttpException } from '@nestjs/common';
import { BaseError } from 'src/core/shared/errors/base.error';
import { isOk, Result } from 'src/core/shared/result';

export abstract class BaseController {
  protected handle<T>(result: Result<T, BaseError>): T {
    if (isOk(result)) return result.value;

    throw new HttpException(
      {
        code: result.error.code,
        message: result.error.message,
      },
      result.error.statusCode,
    );
  }
}
