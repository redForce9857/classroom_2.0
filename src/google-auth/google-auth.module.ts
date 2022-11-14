import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthStrategy } from './utils/googleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAuthStrategy, SessionSerializer],
})
export class GoogleAuthModule {}
