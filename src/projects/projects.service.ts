import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projectsRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto, user: User) {
    const project = await this.projectsRepository.save({
      ...createProjectDto,
      participants: [user]
    })

    return project;
  }

  async findAll() {
    const projects = await this.projectsRepository.find({
      relations: ['tasks', 'stages', 'participants']
    });

    return projects;
  }

  async findOne(id: number) {
    const project = await this.projectsRepository.findOne({
      where: {
        id
      },
      relations: ['participants', 'stages']
    });

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    // const stages = project.stages.map(stage => ({
    //   ...stage,
    //   tasks: project.tasks.filter(task => task.stage.id == stage.id)
    // }))

    // project.stages = stages;

    // delete project.tasks;

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    let project = await this.projectsRepository.findOne({
      where: { id }
    });

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    const updatedProject = await this.projectsRepository.save({ ...project, ...updateProjectDto });

    return updatedProject;
  }

  async remove(id: number) {
    let project = await this.projectsRepository.findOne({
      where: { id }
    });

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    return {
      message: "Project was successfully removed"
    };
  }
}
