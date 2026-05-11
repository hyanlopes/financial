import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { LOGGER_PORT, LoggerPort } from '@core/shared/ports/logger.port';
import { requestContext } from '@nest/infra/observability/request-context';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const correlationId =
      (request.headers['x-correlation-id'] as string) ?? randomUUID();
    const { method, path, body, query, params } = request;
    const startedAt = Date.now();

    response.setHeader('x-correlation-id', correlationId);

    return new Observable((subscriber) => {
      requestContext.run({ correlationId }, () => {
        this.logger.log('incoming request', {
          method,
          path,
          body,
          query,
          params,
        });

        next
          .handle()
          .pipe(
            tap({
              next: (responseBody) => {
                this.logger.log('outgoing response', {
                  method,
                  path,
                  statusCode: response.statusCode,
                  durationMs: Date.now() - startedAt,
                  body: responseBody,
                });
              },
              error: (error) => {
                this.logger.error('request failed', error, {
                  method,
                  path,
                  statusCode: error?.status ?? 500,
                  durationMs: Date.now() - startedAt,
                });
              },
            }),
          )
          .subscribe(subscriber);
      });
    });
  }
}
