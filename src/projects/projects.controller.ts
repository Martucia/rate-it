import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { Participant } from './entities/participant.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectsService.create(createProjectDto, req.user);
  }

  @Get()
  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.projectsService.findAll(req.user);
  }

  @Get(':id')
  @SkipThrottle()
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id || null);
  }

  @Patch('/invite/:id')
  @SkipThrottle()
  invite(
    @Param('id') id: string,
    @Body() dto: { email: string }[]
  ) {
    return this.projectsService.invite(+id, dto);
  }

  @Patch(':id')
  @SkipThrottle()
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @SkipThrottle()
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
