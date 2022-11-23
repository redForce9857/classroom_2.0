import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  readonly display_name: string;
  @IsEmail()
  readonly email: string;
  readonly password: string;
}
