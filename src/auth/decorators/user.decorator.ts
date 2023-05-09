import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const UserD = createParamDecorator(
  (data: string, req: ExecutionContextHost) => {
    const http = req.switchToHttp();
    const request = http.getRequest();
    return request.user
      ? data
        ? request.user[data]
        : request.user
      : undefined;
  },
);
