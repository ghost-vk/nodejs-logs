import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  onModuleInit(): void {
    setInterval(() => {
      this.logger.log({ msg: 'Job completed', meta: { result: nanoid() } });
    }, 3000);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
