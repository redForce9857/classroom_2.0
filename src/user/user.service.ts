import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { use } from 'passport';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepo.findOneBy({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepo.findOneBy({
      display_name: createUserDto.display_name,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    console.log('user', newUser);
    return await this.userRepo.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepo.find({
      select: {
        id: true,
        display_name: true,
        email: true,
        password: true,
      },
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user[0].password
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Password is wrong',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    delete user[0].password;
    return user[0];
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepo.findOneBy({ id: id.toString() });
  }
  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        display_name: user.display_name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
