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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Announcements")
@Controller("courses/:id/announcements")
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({summary: 'Получить announcement'})
  @ApiResponse({
    status: 200,
    description: 'Пример массива',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'текст с описанием',
            example: 'test description of this announcement'
          },
          created_at: {
            type: 'timestamptz',
            description: 'дата создания',
            example: '2022-12-15 04:31:02.463234 +00:00'
          },
          updated_at: {
            type: 'timestamptz',
            description: 'дата последнего обновления',
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
  @ApiBearerAuth()  async findAll(@Param("id") course_id: string) {
    return await this.announcementService.find(course_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(":ann_id")
  @ApiOperation({summary: 'изменить announcement'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          example: 'test text string',
          description: 'announcement text',
        },
        user_: {
          type: 'object',
          description: 'user entity',
        },
        course_: {
          type: 'object',
          description: 'user entity',
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'update successfully'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()  async updateAnnouncement(
    @Param("ann_id") announcement_id: number,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto
  ) {
    return await this.announcementService.update(
      announcement_id,
      updateAnnouncementDto
    );
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  // text: newAnnouncement.text,
  // created_at: newAnnouncement.created_at,
  // updated_at: newAnnouncement.updated_at,
  // display_name: user.display_name,
  @ApiOperation({summary: 'Создать announcement'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          example: 'test text string',
          description: 'announcement text',
        },
        display_name: {
          type: 'string',
          example: 'john doe',
          description: 'name',
        },
        created_at: {
          type: 'timestamptz',
          description: 'дата создания',
          example: '2022-12-15 04:31:02.463234 +00:00'
        },
        updated_at: {
          type: 'timestamptz',
          description: 'дата последнего обновления',
          example: '2022-12-15 04:31:02.463234 +00:00'
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'update successfully'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()  async create(
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
  @ApiOperation({summary: 'Удалить announcement'})
  @ApiResponse({
    status: 200,
    description: "successfully deleted",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()  async remove(@Param("ann_id") announcement_id: number) {
    return this.announcementService.remove(announcement_id);
  }
}
