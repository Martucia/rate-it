import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { IUser } from 'src/types/types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto, user: User) {
    const tasksToUpdate = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.project = :projectId', { projectId: createTaskDto.project })
      .andWhere('task.stage = :stageId', { stageId: createTaskDto.stage })
      .getMany();

    console.log(tasksToUpdate)

    for (const task of tasksToUpdate) {
      task.index += 1;
    }

    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      reporter: user,
      index: 0
    });

    const savedTasks = await this.tasksRepository.save([newTask, ...tasksToUpdate]);

    const newTaskWithRelations = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.id = :taskId', { taskId: savedTasks[0].id })
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.stage', 'stage')
      .getOne();

    return newTaskWithRelations;
  }

  async findAll(user: User, projectId: number) {
    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoin('task.project', 'project')
      .leftJoinAndSelect('task.stage', 'stages')
      .where('project.id = :projectId', { projectId })
      .getMany();

    return tasks;
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id
      },
    });

    if (!task) {
      throw new NotFoundException("No task with this id was found");
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    let task = await this.tasksRepository.findOne({
      where: { id }
    });

    if (!task) {
      throw new NotFoundException("No task with this id was found");
    }

    const updatedTask = await this.tasksRepository.save({ ...task, ...updateTaskDto });

    return updatedTask;
  }

  async remove(id: number) {
    let task = await this.tasksRepository.findOne({
      where: { id }
    });

    if (!task) {
      throw new NotFoundException("No task with this id was found");
    }

    return {
      message: "Task was successfully removed"
    };
  }
}
