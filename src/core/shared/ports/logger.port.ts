export interface LogContext {
  correlationId?: string;
  [key: string]: unknown;
}

export interface LoggerPort {
  log(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: unknown, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
}

export const LOGGER_PORT = 'LoggerPort';
