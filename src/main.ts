import './bootstrap/env.bootstrap';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './nest/app.module';
import { LoggingInterceptor } from '@nest/shared/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from '@nest/shared/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(app.get(GlobalExceptionFilter));
  app.useGlobalInterceptors(app.get(LoggingInterceptor));

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
