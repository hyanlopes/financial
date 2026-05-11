import { LoggerPort } from './ports/logger.port';
import { Result, isOk } from './result';
import { BaseError } from './errors/base.error';

export abstract class BaseUseCase<
  TInput,
  TOutput,
  TError extends BaseError = BaseError,
> {
  constructor(protected readonly logger?: LoggerPort) {}

  private get useCaseName() {
    return this.constructor.name;
  }

  async run(input: TInput): Promise<Result<TOutput, TError>> {
    this.logger.log(`[${this.useCaseName}] starting`, { input });

    const result = await this.execute(input);

    if (isOk(result)) {
      this.logger.log(`[${this.useCaseName}] succeeded`, {
        output: result.value,
      });
    } else {
      this.logger?.warn(`[${this.useCaseName}] failed`, {
        code: result.error.code,
        message: result.error.message,
      });
    }

    return result;
  }

  protected abstract execute(input: TInput): Promise<Result<TOutput, TError>>;
}
