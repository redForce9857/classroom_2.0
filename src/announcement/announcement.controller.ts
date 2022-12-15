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
import { UserEntity } from "src/user/entities/user.entity";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { AuthGuard } from "src/user/guards/user.guard";

@ApiTags("Announcements")
@Controller("courses/:id/announcements")
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({summary: 'Get announcement'})
  @ApiResponse({
    status: 200,
    description: 'All Data list', schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'text with description of this announcement',
            example: 'test description of this announcement'
          },
          created_at: {
            type: 'timestamptz',
            description: 'create date of this announcement',
            example: '2022-12-15 04:31:02.463234 +00:00'
          },
          updated_at: {
            type: 'timestamptz',
            description: 'update date of this announcement',
            example: '2022-12-15 04:31:02.463234 +00:00'
          },
        }
      }
    }

  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(@Param("id") course_id: string) {
    return await this.announcementService.find(course_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(":ann_id")
  @ApiOperation({summary: 'Update one announcement'})
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
  @ApiOperation({summary: 'Create one announcement'})
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
  @ApiOperation({summary: 'Delete one announcement'})
  async remove(@Param("ann_id") announcement_id: number) {
    return this.announcementService.remove(announcement_id);
  }
}
