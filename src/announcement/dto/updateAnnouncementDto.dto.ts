import { PartialType } from "@nestjs/swagger";
import { CreateAnnouncementDto } from "./createAnnouncementDto.dto";

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {}
