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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
  async findAll(@Param("id") announcement_id: number) {
    return await this.commentService.findAll(announcement_id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "создать comment" })
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
  @Delete()
  @ApiOperation({ summary: "удалить comment" })
  async delete(@Param("id") announcement_id: number) {
    return await this.commentService.delete(announcement_id);
  }
}
