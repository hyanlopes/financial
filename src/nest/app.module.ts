import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './infra/observability/logger.module';
import { EnvModule } from './config/env/env.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '@infra/database/postgres/entities/user.orm-entity';
import { ENV_PORT, EnvPort } from '@core/shared/ports/config/env.port';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

@Module({
  imports: [
    EnvModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      inject: [ENV_PORT],
      useFactory: (config: EnvPort) => ({
        type: 'postgres',
        url: config.get('POSTGRES_URL'),
        entities: [UserOrmEntity],
        synchronize: true,
      }),
    }),
    UserModule,
  ],
  providers: [LoggingInterceptor, GlobalExceptionFilter],
})
export class AppModule {}
