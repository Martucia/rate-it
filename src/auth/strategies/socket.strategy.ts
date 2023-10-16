import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class SocketStrategy implements CanActivate {
    private readonly logger = new Logger(SocketStrategy.name);

    constructor(private readonly jwtSercive: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // this.logger.debug("Checking for auth token on request header", request.handshake.headers.authorization);

        const { authorization } = request.handshake.headers;

        try {
            const token = authorization.split(' ')[1];

            const payload = this.jwtSercive.verify(token);

            request.userId = payload.id;

            return true;
        } catch {
            throw new ForbiddenException('Invalid authorization token');
        }
    }
}