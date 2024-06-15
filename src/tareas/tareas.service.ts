import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarea, TareaDocument } from './entities/tarea.entity';
import { Model } from 'mongoose';
import { NotificacionesGateway } from '../socket/notificaciones.gateway';

@Injectable()
export class TareasService {
  constructor(
    @InjectModel(Tarea.name) private tareaModel: Model<TareaDocument>,
    private notificacionesGateway: NotificacionesGateway,
  ) {}

  async create(createTareaDto: CreateTareaDto) {
    const { nombre } = createTareaDto;
    const tarea = await this.tareaModel.findOne({ nombre }).exec();

    if (tarea) {
      throw new BadRequestException('Ya existe una tarea con ese nombre');
    }

    const tareaCreada = this.tareaModel.create(createTareaDto);
    return tareaCreada;
  }

  async findAll() {
    const tareas = await this.tareaModel.find();
    if (!tareas) {
      throw new BadRequestException('No se encontraron tareas');
    }
    return tareas;
  }

  async findOne(id: string) {
    const tarea = await this.tareaModel.findById(id);
    if (!tarea) {
      throw new BadRequestException('tarea no encontrada');
    }
    return tarea;
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    const tarea = await this.tareaModel.findById(id);

    if (!tarea) {
      throw new BadRequestException('No existe una tarea con ese id');
    }
    const tareaActualizada = await this.tareaModel.findByIdAndUpdate(
      id,
      { $set: updateTareaDto },
      { new: true, runValidators: true },
    );
    return tareaActualizada;
  }

  async remove(id: string) {
    const tarea = await this.tareaModel.findById(id);

    if (!tarea) {
      throw new BadRequestException('No existe una tarea con ese id');
    }

    const tareaBorrada = await this.tareaModel.findByIdAndDelete(id);
    return tareaBorrada;
  }
}
