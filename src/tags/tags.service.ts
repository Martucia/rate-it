import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  ) { }

  async create(dto: CreateTagDto) {
    const tag = this.tagsRepository.create({
      color: dto.color,
      label: dto.label,
      project: {
        id: dto.project.id
      }
    })

    await this.tagsRepository.save(tag);

    return tag;
  }

  async findAll() {
    const tags = await this.tagsRepository.find();

    return tags;
  }

  async findOne(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: {
        id
      }
    })

    if (!tag) {
      throw new NotFoundException("No tag with this id was found");
    }

    return tag;
  }

  async update(id: number, dto: UpdateTagDto) {
    const tagToUpdate = await this.tagsRepository.findOne({
      where: {
        id
      }
    })

    if (!tagToUpdate) {
      throw new NotFoundException("No tag with this id was found");
    }

    const tag = await this.tagsRepository.save({ ...tagToUpdate, ...dto })

    return tag;
  }

  async remove(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: {
        id
      }
    });

    if (!tag) {
      throw new NotFoundException("No tag with this id was found");
    }

    try {
      await this.tagsRepository.remove(tag);

      return {
        message: "Tag was successfully removed"
      };
    } catch (e) {
      throw new InternalServerErrorException("Error while removing the tag")
    }
  }
}
