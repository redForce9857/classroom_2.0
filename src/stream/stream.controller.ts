import { Controller, Get } from '@nestjs/common';

@Controller()
export class StreamController {
  @Get()
  async currentStream() {}
}
