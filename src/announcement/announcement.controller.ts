/* eslint-disable prettier/prettier */
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
import { AnnouncementService } from "./announcement.service";
import { CreateAnnouncementDto } from "./dto/createAnnouncementDto.dto";
import { UpdateAnnouncementDto } from "./dto/updateAnnouncementDto.dto";
import { Roles } from "src/user/decorator/roles.decorator";
import { RolesGuard } from "src/user/guards/roles.guard";
import { UserRole } from "src/user_course/enum/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/user/entities/user.entity";
import { UserDecorator } from "src/user/decorator/user.decorator";

@Controller("courses/:id/announcements")
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param("id") course_id: string) {
    return await this.announcementService.find(course_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
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
