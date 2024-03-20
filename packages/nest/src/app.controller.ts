import {
  Controller,
  Get,
  HttpException,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
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

  @Get('/error')
  getError(): never {
    throw new HttpException(
      {
        msg: 'test error',
      },
      400,
      {
        cause: new Error('original error'),
        description: 'test error description',
      },
    );
  }

  @Post('/triggerError')
  triggerError(): unknown {
    return JSON.parse('{');
  }
}
