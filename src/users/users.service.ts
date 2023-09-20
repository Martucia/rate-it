import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtSercice: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })

    if (existUser) throw new BadRequestException('This email already exist!');

    const user = await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password)
    })

    const token = this.jwtSercice.sign({ email: createUserDto.email })

    return { user, token };
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    });

    return user;
  }

  async findOneAllParams(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['tasks', 'projects']
    });
  }

  async getAll() {
    return this.userRepository.find({ relations: ['tasks'] });
  }
}
