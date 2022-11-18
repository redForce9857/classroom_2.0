import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { profile } from "console";
import { Profile } from "passport";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateGoogleAuthDto } from "./dto/create-google-auth.dto";

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async validateUser(dto: CreateGoogleAuthDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (user) {
      //update later
      return;
    }
    const newUser = this.create(dto);
    return newUser;
  }

  async findUser(id: number) {
    const user = await this.userRepo.findOneBy({});
    return user;
  }

  create(dto: CreateGoogleAuthDto) {
    const newUser = this.userRepo.create(dto);
    return this.userRepo.save(newUser);
  }
}
