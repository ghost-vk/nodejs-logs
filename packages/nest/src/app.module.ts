import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { cfg } from './config';
import { getJsonLoggerConfig, getPrettyLoggerConfig } from './logger';

@Module({
  imports: [
    LoggerModule.forRoot(
      cfg.LOG_JSON ? getJsonLoggerConfig() : getPrettyLoggerConfig(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
