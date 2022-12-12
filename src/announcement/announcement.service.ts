import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAnnouncementDto } from "./dto/createAnnouncementDto.dto";
import { UpdateAnnouncementDto } from "./dto/updateAnnouncementDto.dto";
import { AnnouncementEntity } from "./entities/announcement.entity";

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private readonly announcementRepo: Repository<AnnouncementEntity>
  ) {}

  async find(course_id: string) {
    return await this.announcementRepo.find({
      select: { text: true, created_at: true, updated_at: true },
      where: { course_: { id: course_id } },
    });
  }

  async update(
    announcement_id: number,
    updateAnnouncementDto: UpdateAnnouncementDto
  ) {
    return this.announcementRepo.update(announcement_id, updateAnnouncementDto);
  }

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    course_id: string
  ) {
    const newAnnouncement = new AnnouncementEntity();

    // Присваиваем свойству "course_id" код нынешнего курса
    createAnnouncementDto.course_id = course_id;
    Object.assign(newAnnouncement, createAnnouncementDto);

    return await this.announcementRepo.save(newAnnouncement);
  }
}
