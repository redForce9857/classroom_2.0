import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
      return user;
    }
    return this.create(dto);
  }

  async findUser(id: number) {
    return await this.userRepo.findOneBy({ id: id });
  }

  create(dto: CreateGoogleAuthDto) {
    const newUser = this.userRepo.create(dto);
    console.log(newUser);
    return this.userRepo.save(newUser);
  }
}
