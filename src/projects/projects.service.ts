import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Participant } from './entities/participant.entity';
import { MailService } from 'src/mail/mail.service';
import { Invitation } from './entities/invitation.entity';
import { inviteGenerate } from 'src/common/utils/tokenGenerate';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
    @InjectRepository(Invitation)
    private readonly invitationsRepository: Repository<Invitation>,
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
      relations: ['participants', 'stages', 'participants.user', 'tags', 'invitations']
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

  async invite(projectId: number, participants: { email: string }[]) {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: {
        participants: {
          user: true
        }
      }
    })

    if (!project) {
      throw new NotFoundException("No project with this id was found");
    }

    // const result = await this.mailService.sendMail({
    //   to: "shlapak.marta@gmail.com",
    //   subject: "Testing Nest MailerModule ✔",
    //   text: "Helouka",
    //   from: "imarta.shlapak@gmail.com"
    // })


    const existingEmails = project.participants.map(participant => participant.user.email);
    const newEmails = participants.filter(participant => !existingEmails.includes(participant.email));

    if (newEmails.length === 0) return {
      message: "There is no one to invite"
    };

    const invitations = await Promise.all(newEmails.map(async (participant) => {
      const token = inviteGenerate();
      const invitation = await this.invitationsRepository.save({
        project: { id: projectId },
        email: participant.email,
        token
      });
      return invitation;
    }));

    console.log("invitations", invitations)

    return {
      message: "invitations sent successfully"
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
