import { ApiProperty } from "@nestjs/swagger";
import { CourseEntity } from "src/course/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";

export class CreateAnnouncementDto {
  @ApiProperty({
    description: "Содержание объявления",
    example: "Сегодня последний день сдачи задания №1",
  })
  readonly text: string;

  @ApiProperty({
    description: "Курс, к которому относится обращение",
  })
  course_: CourseEntity;

  @ApiProperty({
    description: "Пользователь, который сделал объявление",
  })
  user_: UserEntity;
}
