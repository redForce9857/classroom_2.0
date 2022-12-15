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
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Comments")
@Controller("announcement/:id/comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "взять comments" })
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
