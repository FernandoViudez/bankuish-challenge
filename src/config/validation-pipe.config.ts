import { ValidationPipeOptions } from '@nestjs/common';

export const GlobalValidationPipeConfig: ValidationPipeOptions = {
  forbidNonWhitelisted: true,
  whitelist: true,
};
