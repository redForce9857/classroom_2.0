import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
  @ApiProperty({
    description: "название курса",
    example: "DS course",
  })
  title: string;

  @ApiProperty({
    description: "Аудитория",
    example: "315",
  })
  room?: string;

  @ApiProperty({
    description: "Тема",
    example: "дс курс по программированию",
  })
  section?: string;
}
