// notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificacionesGateway } from './notificaciones.gateway';

@Module({
  providers: [NotificacionesGateway],
  exports: [NotificacionesGateway], // Exporta el gateway para que pueda ser usado en otros módulos
})
export class NotificacionesModule {}
