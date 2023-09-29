import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) { }

  async create(dto: CreateCommentDto, userId: number) {

    // console.log(dto)

    const commentToSave = this.commentsRepository.create({
      text: dto.text,
      user: {
        id: userId
      },
      task: {
        id: dto.task.id
      }
    });

    const savedComment = await this.commentsRepository.save(commentToSave);

    const comment = await this.findOne(savedComment.id);

    console.log(comment)

    return comment;
  }

  async findAll(id: number) {
    const comments = await this.commentsRepository.find({
      where: {
        task: {
          id
        }
      },
      relations: {
        user: true
      },
      order: {
        createdAt: 'DESC'
      }
    });

    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    })

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    let commentToUpdate = await this.commentsRepository.findOne({
      where: { id }
    });

    if (!commentToUpdate) {
      throw new NotFoundException("No comment with this id was found");
    }

    const updatedComment = await this.commentsRepository.save({ ...commentToUpdate, ...updateCommentDto });

    const comment = await this.commentsRepository.findOne({
      where: { id: updatedComment.id },
      relations: {
        task: true,
        user: true
      }
    })

    return comment;
  }

  async remove(id: number) {
    let comment = await this.commentsRepository.findOne({
      where: { id },
      relations: { task: true }
    });

    if (!comment) {
      throw new NotFoundException("No comment with this id was found");
    }

    try {
      await this.commentsRepository.remove(comment);

      return { taskId: comment.task.id };
    } catch (error) {
      throw new InternalServerErrorException("Error while removing the comment");
    }
  }
}
