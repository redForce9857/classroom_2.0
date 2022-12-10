import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AnnouncementService } from "./announcement.service";
import { CreateAnnouncementDto } from "./dto/createAnnouncementDto.dto";
import { UpdateAnnouncementDto } from "./dto/updateAnnouncementDto.dto";

@Controller("courses/:id/announcements")
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  async findAll(@Param("id") course_id: string) {
    return await this.announcementService.find(course_id);
  }

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

  // Тут :id - это айди курса, в котором создается объявление
  @Post()
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @Param("id") course_id: string
  ) {
    return await this.announcementService.create(
      createAnnouncementDto,
      course_id
    );
  }
}
