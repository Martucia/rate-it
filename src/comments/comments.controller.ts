import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() dto: CreateCommentDto,
    @Request() req,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.commentsService.create(dto, req.user.id, files);
  }

  @Get('/all/:taskId')
  findAll(@Param('taskId') id: string) {
    return this.commentsService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.commentsService.update(+id, updateCommentDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
