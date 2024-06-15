import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Grupo, GrupoDocument } from './entities/grupo.entity';
import { Model } from 'mongoose';
import { NotificacionesGateway } from '../socket/notificaciones.gateway';

@Injectable()
export class GruposService {
  constructor(
    @InjectModel(Grupo.name) private grupoModel: Model<GrupoDocument>,
    private notificacionesGateway: NotificacionesGateway,
  ) {}

  async create(createGrupoDto: CreateGrupoDto) {
    const { nombre } = createGrupoDto;
    const grupo = this.grupoModel.findOne({ nombre }).exec();

    if (grupo) {
      throw new BadRequestException('Ya existe un grupo con ese nombre');
    }

    const grupoCreado = await this.grupoModel.create(createGrupoDto);
    return grupoCreado;
  }

  async findAll() {
    const grupos = await this.grupoModel
      .find()
      .populate({
        path: 'tareas',
        model: 'Tarea',
      })
      .exec();

    if (grupos.length === 0) {
      throw new BadRequestException('No se encontraron grupos');
    }
    return grupos;
  }

  async findOne(id: string) {
    const grupo = await this.grupoModel
      .findById(id)
      .populate({
        path: 'tareas',
        model: 'Tarea',
      })
      .exec();
    if (!grupo) {
      throw new BadRequestException('Grupo no encontrado');
    }
    return grupo;
  }

  async update(id: string, updateGrupoDto: UpdateGrupoDto) {
    const grupo = await this.grupoModel.findById(id);

    if (!grupo) {
      throw new BadRequestException('Grupo no encontrado');
    }
    const grupoActualizado = await this.grupoModel
      .findByIdAndUpdate(
        id,
        { $set: updateGrupoDto },
        { new: true, runValidators: true },
      )
      .populate({
        path: 'tareas',
        model: 'Tarea',
      })
      .exec();

    if (updateGrupoDto.tareas) {
      this.notificacionesGateway.sendNotification(
        `Se agrego una o mas tareas al grupo ${grupoActualizado.nombre}`,
        grupoActualizado.nombre,
      );
    }
    return grupoActualizado;
  }

  async remove(id: string) {
    const grupo = await this.grupoModel.findById(id);
    if (!grupo) {
      throw new BadRequestException('Grupo no encontrado');
    }
    const grupoBorrado = await this.grupoModel.findByIdAndDelete(id);
    return grupoBorrado;
  }
}
