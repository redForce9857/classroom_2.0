import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { GoogleAuthService } from "../google-auth.service";
@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(GoogleAuthService) private readonly authService: GoogleAuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/auth/google/redirect",
      scope: ["profile", "email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const user = await this.authService.validateUser(
      {
        email: profile.emails[0].value,
        displayName: profile.displayName,
      },
      accessToken
    );
    done(null, user);
    console.log(accessToken);
  }
}
