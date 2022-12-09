import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnnouncementEntity } from "./entities/announcement.entity";

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private readonly announcementRepo: Repository<AnnouncementEntity>
  ) {}

  async find(course_id: string) {
    await this.announcementRepo.find({
      select: { id: false },
      where: { course_: { id: course_id } },
    });
  }
}
