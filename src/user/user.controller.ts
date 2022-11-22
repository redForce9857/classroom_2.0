import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../user/guards/user.guard';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('getem')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
