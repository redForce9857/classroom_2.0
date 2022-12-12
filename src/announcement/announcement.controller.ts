import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { AuthGuard } from "src/user/guards/user.guard";
import { AnnouncementService } from "./announcement.service";
import { CreateAnnouncementDto } from "./dto/createAnnouncementDto.dto";
import { UpdateAnnouncementDto } from "./dto/updateAnnouncementDto.dto";

@Controller("courses/:id/announcements")
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param("id") course_id: string) {
    return await this.announcementService.find(course_id);
  }

  @UseGuards(AuthGuard)
  @Patch(":ann_id")
  async updateAnnouncement(
    @Param("ann_id") announcement_id: number,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto
  ) {
    return await this.announcementService.update(
      announcement_id,
      updateAnnouncementDto
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @Param("id") course_id: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.announcementService.create(
      createAnnouncementDto,
      course_id,
      user
    );
  }

  @UseGuards(AuthGuard)
  @Delete(":ann_id")
  async remove(@Param("ann_id") announcement_id: number) {
    return this.announcementService.remove(announcement_id);
  }
}
