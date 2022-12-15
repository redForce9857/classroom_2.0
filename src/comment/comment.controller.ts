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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Comments")
@Controller("announcement/:id/comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param("id") announcement_id: number) {
    return await this.commentService.findAll(announcement_id);
  }

  @UseGuards(AuthGuard)
  @Post()
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
  async delete(@Param("id") announcement_id: number) {
    return await this.commentService.delete(announcement_id);
  }
}
