import { Global, Module } from '@nestjs/common';
import { EnvService } from '@core/application/services/env.service';
import { ENV_PORT } from '@core/shared/ports/config/env.port';
import { loadEnv } from '@infra/config/env/env.loader';

@Global()
@Module({
  providers: [
    {
      provide: ENV_PORT,
      useValue: new EnvService(loadEnv()),
    },
  ],
  exports: [ENV_PORT],
})
export class EnvModule {}
