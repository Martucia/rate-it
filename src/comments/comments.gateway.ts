import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards, Request } from '@nestjs/common';
import { SocketAuthGuard } from 'src/auth/guards/socket-auth.guard';
import { SocketStrategy } from 'src/auth/strategies/socket.strategy';

@WebSocketGateway(8001, { cors: '*' })
export class CommentsGateway {
  constructor(private readonly commentsService: CommentsService) { }

  @WebSocketServer()
  // server: { emit: (arg0: string, arg1: string) => void; };
  server: any;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log("Connected!", socket.id)
    })
  }

  @SubscribeMessage('comment')
  @UseGuards(SocketStrategy)
  async handleMessage
    (
      @MessageBody() dto: CreateCommentDto,
      @Request() req: any
    ): Promise<void> {

    const comment = await this.commentsService.create(dto, req.userId);

    this.server.emit('comment', comment);
  }
}
