import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { GoogleAuthService } from "./google-auth.service";
import { GoogleAuthGuard } from "./utils/guards";

@ApiTags("Auth")
@Controller("auth")
export class GoogleAuthController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(GoogleAuthService)
    private readonly authService: GoogleAuthService
  ) {}

  @Get("google/login")
  @ApiOperation({ summary: "логин через google" })
  @UseGuards(GoogleAuthGuard)
  async Login() {
    return { msg: "google auth" };
  }

  @Get("google/redirect")
  @ApiOperation({ summary: "редирект через google" })
  @UseGuards(GoogleAuthGuard)
  // @Header("authorization", "none")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async redirect(@UserDecorator() user: UserEntity) {
    return this.userService.generateJwt(user as UserEntity);
  }
}
