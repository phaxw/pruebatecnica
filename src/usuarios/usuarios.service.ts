import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { GruposService } from '../grupos/grupos.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    private readonly grupoService: GruposService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioCreado = await this.usuarioModel.create(createUsuarioDto);
    return usuarioCreado;
  }

  async findByEmail(email: string) {
    const usuario = await this.usuarioModel.findOne({ email }).exec();
    return usuario;
  }

  async findAll() {
    const usuarios = await this.usuarioModel
      .find()
      .populate({
        path: 'grupos',
        model: 'Grupo',
        populate: {
          path: 'tareas',
          model: 'Tarea',
        },
      })
      .exec();
    if (!usuarios) {
      throw new NotFoundException('No se encontraron usuarios');
    }
    return usuarios;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioModel
      .findById(id)
      .populate({
        path: 'grupos',
        model: 'Grupo',
        populate: {
          path: 'tareas',
          model: 'Tarea',
        },
      })
      .exec();

    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioActualizado = await this.usuarioModel
      .findByIdAndUpdate(
        id,
        { $set: updateUsuarioDto },
        { new: true, runValidators: true },
      )
      .populate({
        path: 'grupos',
        populate: {
          path: 'tareas',
          model: 'Tarea',
        },
        model: 'Grupo',
      })
      .exec();

    return usuarioActualizado;
  }

  async remove(id: string) {
    const usuarioBorrado = await this.usuarioModel.findByIdAndDelete(id);
    return usuarioBorrado;
  }

  async addGrupoToUsuario(
    usuarioId: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const usuarioActualizado = await this.usuarioModel
      .findByIdAndUpdate(
        usuarioId,
        { $set: updateUsuarioDto },
        { new: true, runValidators: true },
      )
      .populate({
        path: 'grupos',
        model: 'Grupo',
        populate: {
          path: 'tareas',
          model: 'Tarea',
        },
      })
      .exec();

    return usuarioActualizado;
  }

  buildUsuarioResponse(id: string, usuario: Usuario) {
    return {
      _id: id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      grupos: usuario.grupos,
    };
  }
}
