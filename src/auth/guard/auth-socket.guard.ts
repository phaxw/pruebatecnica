import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const cliente: Socket = context.switchToWs().getClient<Socket>();
    const token = cliente.handshake.query.token.toString();

    if (!token) {
      throw new UnauthorizedException('Sin autorizacion');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      context.switchToWs().getData().user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Sin autorizacion');
    }
  }
}
