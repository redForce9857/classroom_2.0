import { ApiProperty } from "@nestjs/swagger";

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
  @ApiProperty({
    description: "Раздел",
    example: "раздел А",
  })
  readonly section: string;
}
