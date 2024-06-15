import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarea, TareaSchema } from './entities/tarea.entity';
import { NotificacionesModule } from '../socket/notificaciones.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }]),
    NotificacionesModule,
  ],
  controllers: [TareasController],
  providers: [TareasService],
  exports: [TareasService],
})
export class TareasModule {}
