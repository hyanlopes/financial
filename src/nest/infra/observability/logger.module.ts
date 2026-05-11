import { Global, Module } from '@nestjs/common';
import { LOGGER_PORT } from '@core/shared/ports/logger.port';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [
    LoggerService,
    {
      provide: LOGGER_PORT,
      useClass: LoggerService,
    },
  ],
  exports: [LOGGER_PORT, LoggerService],
})
export class LoggerModule {}
