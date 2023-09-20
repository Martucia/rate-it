import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('reg')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/')
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':email')
  getById(@Param('email') email: string) {
    return this.usersService.findOneAllParams(email);
  }
}
