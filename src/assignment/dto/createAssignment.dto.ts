import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  readonly topic: string;

  readonly description: string;

  readonly theme: string;

  readonly maxGrade: number;
}
