// notifications.gateway.ts
import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthSocketGuard } from '../auth/guard/auth-socket.guard';

@WebSocketGateway()
@UseGuards(AuthSocketGuard)
export class NotificacionesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private clientes: Map<string, string> = new Map();

  afterInit(server: Server) {
    console.log('Socket iniciado');
  }

  handleConnection(cliente: Socket) {
    console.log(`Cliente conectado: ${cliente.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('notificacion')
  sendNotification(mensaje: string, cliente: string) {
    this.server.emit(cliente, mensaje);
  }
}
