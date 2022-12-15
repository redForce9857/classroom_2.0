import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/user.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login.dto";
import { UserEntity } from "./entities/user.entity";
import { AuthGuard } from "./guards/user.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserDecorator } from "./decorator/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common/decorators";
import * as imageStorage from "./helpers/image-storage";
import { SharpPipe } from "./pipes/sharp.pipe";
@ApiTags("users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post("register")
  async createUser(
    @Body("user") createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @UsePipes(new ValidationPipe())
  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get("getem")
  @UseGuards(AuthGuard)
  async currentUser(
    @UserDecorator() user: UserEntity
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put("update")
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @UserDecorator("id") currentUserId: number,
    @Body("user") updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto
    );
    return this.userService.buildUserResponse(user);
  }

  @UseGuards(AuthGuard)
  @Post("upload")
  @UseInterceptors(FileInterceptor("image", imageStorage.saveImageToStorage))
  async uploadFile(
    @UploadedFile(SharpPipe) image: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.userService.uploadImage(image, user);
  }
}
