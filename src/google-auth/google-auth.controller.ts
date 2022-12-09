import {
  ConsoleLogger,
  Controller,
  Get,
  Header,
  Inject,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthStrategy } from './utils/googleStrategy';
import { GoogleAuthGuard } from './utils/guards';

@ApiTags('Auth')
@Controller('auth')
export class GoogleAuthController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
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
  @Redirect('/courses/get-courses')
  @Header('authorization', 'none')
  async redirect(@Req() request: Request, @Res() response: Response) {
    return this.userService.generateJwt(request.user as UserEntity);
  }
}
