import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'passport';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateGoogleAuthDto } from './dto/create-google-auth.dto';
import { UpdateGoogleAuthDto } from './dto/update-google-auth.dto';
import { UserDetails } from './utils/types';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async validateUser(dto: CreateGoogleAuthDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (user) {
      //update later
      return user;
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
