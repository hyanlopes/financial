// src/nest/infra/observability/logger.service.ts
import pino, { Logger } from 'pino';
import { Injectable } from '@nestjs/common';
import { LogContext, LoggerPort } from '@core/shared/ports/logger.port';
import { requestContext } from './request-context';

@Injectable()
export class LoggerService implements LoggerPort {
  private readonly pino: Logger = pino({
    level: process.env.LOG_LEVEL ?? 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  });

  private enrich(context?: LogContext): LogContext {
    const store = requestContext.getStore();
    return { ...store, ...context };
  }

  private serializeError(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }
    return { raw: error };
  }

  log(message: string, context?: LogContext): void {
    this.pino.info(this.enrich(context), message);
  }

  warn(message: string, context?: LogContext): void {
    this.pino.warn(this.enrich(context), message);
  }

  error(message: string, error?: unknown, context?: LogContext): void {
    this.pino.error(
      {
        ...this.enrich(context),
        ...(error && { err: this.serializeError(error) }),
      },
      message,
    );
  }

  debug(message: string, context?: LogContext): void {
    this.pino.debug(this.enrich(context), message);
  }
}
