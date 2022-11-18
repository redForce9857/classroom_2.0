import {
  ConsoleLogger,
  Controller,
  Get,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthStrategy } from './utils/googleStrategy';
import { GoogleAuthGuard } from './utils/guards';

@ApiTags('Auth')
@Controller('auth')
export class GoogleAuthController {
  constructor(
    @Inject(GoogleAuthService)
    private readonly authService: GoogleAuthService
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async Login() {
    return { msg: 'google auth' };
  }
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async redirect(@Req() request: Request) {
    return request.user;
  }
}
