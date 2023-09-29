import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>
  ) { }

  async create(createProjectDto: CreateProjectDto, user: User) {

    const project = await this.projectsRepository.save({
      ...createProjectDto,
      stages: [],
      participants: []
    })

    const participant = await this.participantsRepository.save({
      user: { id: user.id },
      project: { id: project.id },
      role: "owner",
      status: "accepted"
    })

    project.participants.push(participant);

    const updatedProject = await this.projectsRepository.save(project);

    return updatedProject;
  }

  async findAll(user: User) {
    // const projects = await this.projectsRepository
    //   .createQueryBuilder('project')
    //   // .innerJoin('project.participants', 'participants')
    //   // .innerJoin('participants.user', 'user')
    //   // .where('user.id = :userId', { userId: user.id })
    //   // .leftJoinAndSelect('project.tasks', 'tasks')
    //   // .leftJoinAndSelect('project.stages', 'stages')
    //   .leftJoinAndSelect('project.participants', 'participants')
    //   .leftJoinAndSelect('participants.user', 'user')
    //   .getMany();

    const projects = await this.projectsRepository.find({
      where: {
        participants: [{
          user: { id: user.id }
        }]
      },
      relations: ['participants', 'stages', 'participants.user']
    });

    return projects;
  }

  async findOne(id: number) {
    const project = await this.projectsRepository.findOne({
      where: {
        id
      },
      // relations: {
      //   participants: {
      //     user: true
      //   }
      // }
    });

    //['participants', 'stages']

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    let project = await this.projectsRepository.findOne({
      where: { id },
      // relations: { participants: true }
    });

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    // const newParticipants = project.participants.find(participant => updateProjectDto.participants.find(user => user.id))

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
