import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthStrategy } from './utils/googleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './utils/serializer';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAuthStrategy, SessionSerializer],
})
export class GoogleAuthModule {}
