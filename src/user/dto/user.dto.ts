import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "Username",
    example: "randomrandom",
  })
  readonly display_name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "email",
    example: "random@gmail.com",
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "пароль",
    example: "random123",
  })
  readonly password: string;
}
