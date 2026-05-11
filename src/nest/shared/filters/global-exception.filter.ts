import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LOGGER_PORT, LoggerPort } from '@core/shared/ports/logger.port';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { statusCode, body } = this.resolve(exception);

    this.log(exception, statusCode, request);

    response.status(statusCode).json(body);
  }

  private resolve(exception: unknown): {
    statusCode: number;
    body: Record<string, unknown>;
  } {
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse();

      return {
        statusCode,
        body:
          typeof response === 'string'
            ? { code: 'HTTP_EXCEPTION', message: response }
            : (response as Record<string, unknown>),
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    };
  }

  private log(exception: unknown, statusCode: number, request: Request): void {
    const context = {
      method: request.method,
      path: request.path,
      statusCode,
    };

    if (statusCode < 500) {
      this.logger.warn('request exception', context);
    } else {
      this.logger.error('unhandled exception', exception, context);
    }
  }
}
