import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Participant } from './entities/participant.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
    private readonly mailService: MailService
  ) { }

  async create(dto: CreateProjectDto, user: User) {

    const project = await this.projectsRepository.save({
      ...dto,
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
    const projects = await this.projectsRepository.find({
      where: {
        participants: [{
          user: { id: user.id }
        }]
      },
      relations: ['participants', 'stages', 'participants.user', 'tags']
    });

    const projectsOut = projects.map(pr => ({
      ...pr,
      downloadedTask: 'none'
    }))

    return projectsOut;
  }

  async findOne(id: number) {
    const project = await this.projectsRepository.findOne({
      where: {
        id
      }
    });

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    return project;
  }

  async invite(id: number, participants: Participant[]) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: { participants: true }
    })

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    const result = await this.mailService.sendMail({
      to: "shlapak.marta@gmail.com",
      subject: "Testing Nest MailerModule ✔",
      text: "Helouka",
      from: "imarta.shlapak@gmail.com"
    })

    console.log("result", result)

    return {
      message: "Lol"
    }
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      // relations: { participants: true }
    });

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    // const newParticipants = project.participants.find(participant => updateProjectDto.participants.find(user => user.id))

    const updatedProject = await this.projectsRepository.save({ ...project, ...dto });

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
