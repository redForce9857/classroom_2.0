import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Streams")
@Controller()
export class StreamController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async currentStream() {}
}
