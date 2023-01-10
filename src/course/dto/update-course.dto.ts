import { ApiProperty } from "@nestjs/swagger";

export class UpdateCourseDto {
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

  readonly creatorAvatar: string;

  readonly background: string;

  readonly chapter: string;
}
