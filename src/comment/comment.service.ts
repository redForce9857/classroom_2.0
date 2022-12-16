import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/createComment.dto";
import { AnnouncementEntity } from "../announcement/entities/announcement.entity";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(AnnouncementEntity)
    private readonly announcementRepo: Repository<AnnouncementEntity>
  ) {}

  async findAll(announcement_id: number) {
    return await this.commentRepo.find({
      where: { announcement: { id: announcement_id } },
    });
  }

  async create(
    createCommentDto: CreateCommentDto,
    announcement_id: number,
    user: UserEntity
  ) {
    const newComment = new CommentEntity();

    createCommentDto.announcement = await this.announcementRepo.findOne({
      where: { id: announcement_id },
    });
    createCommentDto.author = user;

    Object.assign(newComment, createCommentDto);

    return await this.commentRepo.save(newComment);
  }

  async delete(announcement_id: number) {
    const announcement = await this.announcementRepo.findOne({
      where: { id: announcement_id },
    });

    if (announcement) {
      await this.commentRepo.delete({
        announcement: { id: announcement_id },
      });
    }
    return "Delete Successfully";
  }
}
