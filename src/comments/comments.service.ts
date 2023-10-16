import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { FileService } from 'src/file/file.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly fileService: FileService
  ) { }

  async create(dto: CreateCommentDto, userId: number, files?: Express.Multer.File[]) {

    if (files && files.length > 0) {
      const uploadedFiles = await this.fileService.uploadFiles(files);

      dto.files = uploadedFiles;
    }

    const data = JSON.parse(dto.comment);

    // const data = dto.comment;

    const commentToSave = this.commentsRepository.create({
      text: data.text,
      user: {
        id: userId
      },
      task: {
        id: data.task.id
      },
      files: dto.files
    });

    const savedComment = await this.commentsRepository.save(commentToSave);

    const comment = await this.findOne(savedComment.id);

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

  async update(id: number, dto: UpdateCommentDto, files?: Express.Multer.File[]) {

    let commentToUpdate = await this.commentsRepository.findOne({
      where: { id }
    });

    if (!commentToUpdate) {
      throw new NotFoundException("No comment with this id was found");
    }

    let uploadedFiles = [];

    if (files && files.length > 0) {
      uploadedFiles = await this.fileService.uploadFiles(files);
    }

    const updates = JSON.parse(dto.comment);

    // const updates = dto;

    updates.files = [...uploadedFiles, ...updates.files]

    const updatedComment = await this.commentsRepository.save({ ...commentToUpdate, ...updates });

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
