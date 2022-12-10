import { ApiProperty } from "@nestjs/swagger";

export class CreateAnnouncementDto {
  @ApiProperty({
    description: "Содержание объявления",
    example: "Сегодня последний день сдачи задания №1",
  })
  readonly text: string;

  course_id: string;
}
