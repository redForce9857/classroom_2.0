import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "email",
    example: "random@gmail.com",
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "password",
    example: "random123",
  })
  readonly password: string;
}
