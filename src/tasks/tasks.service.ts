import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { IUser } from 'src/common/types/types';
import { User } from 'src/users/entities/user.entity';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly commentsService: CommentsService
  ) { }

  async create(dto: CreateTaskDto, user: User) {
    const tasksToUpdate = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.project = :projectId', { projectId: dto.project })
      .andWhere('task.stage = :stageId', { stageId: dto.stage })
      .getMany();

    for (const task of tasksToUpdate) {
      task.index += 1;
    }

    const newTask = this.tasksRepository.create({
      ...dto,
      reporter: { id: user.id },
      index: 0
    });

    const savedTasks = await this.tasksRepository.save([newTask, ...tasksToUpdate]);

    const task = await this.findOne(savedTasks[0].id);

    return task;
  }

  async findAll(projectId: number) {
    // const tasks = await this.tasksRepository.find({
    //   where: {
    //     project: {
    //       id: projectId
    //     }
    //   },
    //   relations: {
    //     responsible: true,
    //     reporter: true,
    //     stage: true,
    //     comments: {
    //       user: true
    //     },
    //     childTasks: true,
    //     parentTask: true
    //   }
    // });

    const tasks = await this.tasksRepository.find({
      where: {
        project: {
          id: projectId
        }
      },
      relations: {
        responsible: true,
        stage: true,
        tags: true,
        project: true
      },
      select: [
        'index',
        'title',
        'deadline',
        'responsible',
        'stage',
        'id',
        'tags',
        'project'
      ]
    });

    const tasksOut = tasks.map(task => ({
      ...task,
      downloadedTask: 'simple'
    }))

    return tasksOut;
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id
      },
      relations: {
        responsible: true,
        reporter: true,
        stage: true,
        childTasks: true,
        parentTask: true,
        tags: true
      },
    });

    if (!task) {
      throw new NotFoundException("No task with this id was found");
    }

    const comments = await this.commentsService.findAll(task.id);

    task.comments = comments;

    const taskOut = {
      ...task,
      downloadedTask: "full"
    }

    return taskOut;
  }

  async update(id: number, dto: UpdateTaskDto) {
    let taskToUpdate = await this.tasksRepository.findOne({
      where: { id }
    });

    if (!taskToUpdate) {
      throw new NotFoundException("No task with this id was found");
    }

    await this.tasksRepository.save({ ...taskToUpdate, ...dto });

    const task = await this.findOne(taskToUpdate.id);

    return task;
  }

  async move(updateTaskDto: UpdateTaskDto[]) {

    updateTaskDto.forEach(async task => {
      const ts = await this.tasksRepository.findOne({
        where: { id: task.id }
      });

      if (!ts) {
        throw new NotFoundException("No task with this id was found");
      }

      await this.tasksRepository.save({ ...ts, ...task });
    })

    return {
      message: "Task was successfully moved"
    };;
  }

  async remove(id: number) {
    let task = await this.tasksRepository.findOne({
      where: { id }
    });

    if (!task) {
      throw new NotFoundException("No task with this id was found");
    }

    try {
      await this.tasksRepository.remove(task);

      return {
        message: "Task was successfully removed"
      };
    } catch (error) {
      throw new InternalServerErrorException("Error while removing the task");
    }
  }
}
