import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { GoogleAuthService } from '../google-auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(GoogleAuthService) private readonly authService: GoogleAuthService,
  ) {
    super();
  }

  async serializeUser(user: UserEntity, done: Function) {
    console.log('serialize user');
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload.id);
    console.log('deserialize user');
    return user ? done(null, user) : done(null, null);
  }
}
