import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  active() {
    return 200;
  }
}
