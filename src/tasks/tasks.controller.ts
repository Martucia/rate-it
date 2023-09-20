import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  findAll(@Param('projectId') projectId: number | null, @Request() req) {
    return this.tasksService.findAll(req.user, +projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
