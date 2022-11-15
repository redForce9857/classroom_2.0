import { ApiProperty } from "@nestjs/swagger";

export class CreateGradeDto {
  @ApiProperty({
    description: "Оценка",
    example: "95",
  })
  mark: number;
}
