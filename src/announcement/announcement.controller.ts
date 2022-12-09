import { Controller, Get, Param } from "@nestjs/common";
import { AnnouncementService } from "./announcement.service";

@Controller()
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get("/:course_id")
  async findAll(@Param("course_id") course_id: string) {
    return await this.announcementService.find(course_id);
  }
}
