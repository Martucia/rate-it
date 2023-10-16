import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get('all/:projectId')
  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Param('projectId') projectId: number | null,
    // @Request() req
  ) {
    return this.tasksService.findAll(+projectId); // req.user.id, 
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch('/move')
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  move(@Body() updateTaskDto: UpdateTaskDto[]) {
    return this.tasksService.move(updateTaskDto)
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
