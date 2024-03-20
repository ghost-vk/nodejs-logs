import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  // https://docs.nestjs.com/techniques/logger#dependency-injection
  // all logs will be buffered until a custom logger is attached
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(Logger);

  app.useLogger(logger);
  // https://github.com/iamolegga/nestjs-pino/blob/master/src/LoggerErrorInterceptor.ts
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(3535);
}
bootstrap();
