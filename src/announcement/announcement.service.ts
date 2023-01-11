import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "src/course/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateAnnouncementDto } from "./dto/createAnnouncementDto.dto";
import { UpdateAnnouncementDto } from "./dto/updateAnnouncementDto.dto";
import { AnnouncementEntity } from "./entities/announcement.entity";

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private readonly announcementRepo: Repository<AnnouncementEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>
  ) {}

  async find(course_id: string) {
    return await this.announcementRepo.find({
      where: { course_: { id: course_id } },
      relations: { user_: true, course_: true },
    });
  }

  async update(
    announcement_id: number,
    updateAnnouncementDto: UpdateAnnouncementDto
  ) {
    await this.announcementRepo.update(announcement_id, updateAnnouncementDto);
    return "update successfully";
  }

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    course_id: string,
    user: UserEntity
  ) {
    const newAnnouncement = new AnnouncementEntity();

    const current_course = await this.courseRepo.findOneBy({ id: course_id });
    Object.assign(newAnnouncement, createAnnouncementDto, {
      course_: current_course,
      user_: user,
    });

    await this.announcementRepo.save(newAnnouncement);

    return {
      text: newAnnouncement.text,
      created_at: newAnnouncement.created_at,
      updated_at: newAnnouncement.updated_at,
      display_name: user.display_name,
    };
  }

  // Проверка на то, кто создал Announcement
  async remove(announcement_id: number) {
    await this.announcementRepo.delete({ id: announcement_id });

    throw new NotFoundException("Course not found");
  }
}
