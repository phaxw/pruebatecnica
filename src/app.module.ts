import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GruposModule } from './grupos/grupos.module';
import { TareasModule } from './tareas/tareas.module';
import { AuthModule } from './auth/auth.module';
import { NotificacionesModule } from './socket/notificaciones.module';
import { config } from './config/config';

//TODO: Revisar si es buena practica dejar el authsource
@Module({
  imports: [
    UsuariosModule,
    MongooseModule.forRoot(
      `mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin`,
      //`mongodb://mongoadmin:password123@mongo:27017/prueba_tecnicadb?authSource=admin`,
    ),
    GruposModule,
    TareasModule,
    AuthModule,
    NotificacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
