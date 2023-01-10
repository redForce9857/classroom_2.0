import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../user/entities/user.entity";

export class CreateCourseDto {
  @ApiProperty({
    description: "Название курса",
    example: "курс 1",
  })
  readonly title: string;

  @ApiProperty({
    description: "Аудитория",
    example: "315",
  })
  readonly room: string;
  creator_: UserEntity;
}
