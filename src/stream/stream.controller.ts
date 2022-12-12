import { Controller, Get } from "@nestjs/common";

@Controller()
export class StreamController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async currentStream() {}
}
