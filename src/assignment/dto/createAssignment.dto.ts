import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CourseEntity } from "src/course/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";

export class CreateAssignmentDto {
  @ApiProperty({
    description: "Название задания",
    example: "Уравнения прямой, задачи",
  })
  @IsNotEmpty()
  readonly topic: string;

  @ApiProperty({
    description: "Описание задания",
    example: "Порядок решения и подробное описание задания",
  })
  readonly description: string;

  @ApiProperty({
    description: "Тема задания",
    example: "Линейная алгебра",
  })
  readonly theme: string;

  @ApiProperty({
    description: "Максимальная оценка за задание",
    example: "80",
  })
  readonly maxGrade: number;

  @ApiProperty({
    description: "Создатель задания",
  })
  user_: UserEntity;

  @ApiProperty({
    description: "Курс, к которому относится задание",
  })
  course_: CourseEntity;
}
