import { PartialType } from '@nestjs/swagger';
import { CreateGoogleAuthDto } from './create-google-auth.dto';

export class UpdateGoogleAuthDto extends PartialType(CreateGoogleAuthDto) {}
