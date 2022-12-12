import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserEntity } from "src/user/entities/user.entity";
import { GoogleAuthService } from "../google-auth.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(GoogleAuthService) private readonly authService: GoogleAuthService
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async serializeUser(user: UserEntity, done: Function) {
    done(null, user);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload.id);
    console.log("deserialize user");
    return user ? done(null, user) : done(null, null);
  }
}
