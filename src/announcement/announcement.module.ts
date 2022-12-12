import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnnouncementController } from "./announcement.controller";
import { AnnouncementService } from "./announcement.service";
import { AnnouncementEntity } from "./entities/announcement.entity";
import { UserCourseEntity } from "../user_course/entities/usercourse.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementEntity, UserCourseEntity])],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
