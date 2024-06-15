import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grupo, GrupoSchema } from './entities/grupo.entity';
import { NotificacionesModule } from '../socket/notificaciones.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
    NotificacionesModule,
  ],
  controllers: [GruposController],
  providers: [GruposService],
  exports: [GruposService],
})
export class GruposModule {}
