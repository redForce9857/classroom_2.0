import { IsNotEmpty } from "class-validator";
import { UserEntity } from "../../user/entities/user.entity";
import { AnnouncementEntity } from "../../announcement/entities/announcement.entity";

export class CreateCommentDto {
  @IsNotEmpty()
  readonly text: string;

  author: UserEntity;

  announcement: AnnouncementEntity;
}
