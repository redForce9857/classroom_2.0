import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  Patch,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiOperation({ summary: "взять всех users" })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      items: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "уникальный id",
            example: "42",
          },
          email: {
            type: "string",
            description: "емейл",
            example: "Doe@gmail.com",
          },
          display_name: {
            type: "string",
            description: "отображаемое имя",
            example: "John Doe",
          },
          password: {
            type: "string",
            description: "захешированный пароль",
            example:
              "$2b$10$XLIrX9bp30OijmbyME0M3u17esCFN1WlAoeQ1YeWhnuHTbmTsRk1W",
          },
          access_token: {
            type: "string",
            description: "токен",
          },
          image: {
            type: "string",
            description: "ссылка на аватар",
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async findAll() {
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post("register")
  @ApiOperation({ summary: "регистрация" })
  async createUser(
    @Body("user") createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @UsePipes(new ValidationPipe())
  @Post("login")
  @ApiOperation({ summary: "вход" })
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get("getem")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "взять текущего user" })
  @ApiResponse({
    status: 200,
    description: "Пример объекта",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "уникальный id",
          example: "42",
        },
        email: {
          type: "string",
          description: "емейл",
          example: "Doe@gmail.com",
        },
        display_name: {
          type: "string",
          description: "отображаемое имя",
          example: "John Doe",
        },
        password: {
          type: "string",
          description: "захешированный пароль",
          example:
            "$2b$10$XLIrX9bp30OijmbyME0M3u17esCFN1WlAoeQ1YeWhnuHTbmTsRk1W",
        },
        access_token: {
          type: "string",
          description: "токен",
        },
        image: {
          type: "string",
          description: "ссылка на аватар",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async currentUser(
    @UserDecorator() user: UserEntity
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Patch("update")
  @ApiOperation({ summary: "изменить user" })
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
  @ApiOperation({ summary: "добавить изображение к user" })
  @UseInterceptors(FileInterceptor("image", imageStorage.saveImageToStorage))
  async uploadFile(
    @UploadedFile(SharpPipe) image: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.userService.uploadImage(image, user);
  }
}
