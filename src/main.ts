// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { GlobalValidationPipeConfig } from './config/validation-pipe.config';
import { environment } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe(GlobalValidationPipeConfig));
  await app.listen(environment.port);
}
bootstrap();
