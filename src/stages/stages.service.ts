import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage) private readonly stagesRepository: Repository<Stage>,
  ) { }

  async create(createStageDto: CreateStageDto) {
    const stage = await this.stagesRepository.save(createStageDto);

    return stage;
  }

  async findAll() {
    const stages = await this.stagesRepository.find();

    return stages;
  }

  async findOne(id: number) {
    const stage = await this.stagesRepository.findOne({
      where: {
        id
      },
      relations: ['project'],
      select: ['id', 'name', 'project'],
    });

    return stage;
  }

  async update(id: number, updateStageDto: UpdateStageDto) {
    const stage = await this.stagesRepository.findOne({
      where: { id }
    });

    if (!stage) {
      throw new NotFoundException("No stage with this id was found");
    }

    const updatedStage = await this.stagesRepository.save({ ...stage, ...updateStageDto });

    return updatedStage;
  }

  async move(updateStageDto: UpdateStageDto[]) {

    updateStageDto.forEach(async stage => {
      const st = await this.stagesRepository.findOne({
        where: { id: stage.id }
      });

      if (!st) {
        throw new NotFoundException("No stage with this id was found");
      }

      const updated = await this.stagesRepository.save({ ...st, ...stage });

    })

    return {
      message: "Stage was successfully moved"
    };;
  }

  async remove(id: number) {
    let stage = await this.stagesRepository.findOne({
      where: { id }
    });

    if (!stage) {
      throw new NotFoundException("No stage with this id was found");
    }

    return {
      message: "Stage was successfully removed"
    };
  }
}
