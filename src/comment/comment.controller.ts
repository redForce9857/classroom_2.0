import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../user/guards/user.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/createComment.dto";
import { UserDecorator } from "../user/decorator/user.decorator";
import { UserEntity } from "../user/entities/user.entity";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Comments")
@Controller("announcement/:id/comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "взять comments" })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "уникальный id",
            example: "42",
          },
          text: {
            type: "string",
            description: "текст комментария",
            example: "тестовый текст комментария",
          },
          created_at: {
            type: "timestamptz",
            description: "дата создания",
            example: "2022-12-15 04:31:02.463234 +00:00",
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()
  async findAll(@Param("id") announcement_id: number) {
    return await this.commentService.findAll(announcement_id);
  }

  @UseGuards(AuthGuard)
  @Post(":id")
  @ApiOperation({ summary: "создать comment" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          example: "test text string",
          description: "comment text",
        },
        announcement: {
          type: "object",
          description: "announcement entity",
        },
        author_: {
          type: "object",
          description: "user entity",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "update successfully",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "уникальный id",
          example: "42",
        },
        text: {
          type: "string",
          example: "test text string",
          description: "comment text",
        },
        announcement: {
          type: "object",
          description: "announcement entity",
        },
        author_: {
          type: "object",
          description: "user entity",
        },
        created_at: {
          type: "timestamptz",
          description: "дата создания",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
      },
    },
  })
  @ApiBearerAuth()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param("id") announcement_id: number,
    @UserDecorator() user: UserEntity
  ) {
    return await this.commentService.create(
      createCommentDto,
      announcement_id,
      user
    );
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "удалить comment" })
  @ApiParam({
    name: "id",
    type: "integer",
    description: "enter unique id",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "deleted successfully",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()
  async delete(@Param("id") announcement_id: number) {
    return await this.commentService.delete(announcement_id);
  }
}
