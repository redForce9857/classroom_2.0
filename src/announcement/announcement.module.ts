import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssignmentController } from "src/assignment/assignment.controller";
import { CourseModule } from "src/course/course.module";
import { CourseEntity } from "src/course/entities/course.entity";
import { AnnouncementController } from "./announcement.controller";
import { AnnouncementService } from "./announcement.service";
import { AnnouncementEntity } from "./entities/announcement.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnouncementEntity, CourseEntity]),
    CourseModule,
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
