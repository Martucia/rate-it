import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) { }

  @Post()
  @SkipThrottle()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stagesService.create(createStageDto);
  }

  @Get()
  @SkipThrottle()
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(':id')
  @SkipThrottle()
  findOne(@Param('id') id: string) {
    return this.stagesService.findOne(+id);
  }


  @Patch('/move')
  @SkipThrottle()
  move(@Body() updateStageDto: UpdateStageDto[]) {
    return this.stagesService.move(updateStageDto);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    return this.stagesService.update(+id, updateStageDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.stagesService.remove(+id);
  }
}
