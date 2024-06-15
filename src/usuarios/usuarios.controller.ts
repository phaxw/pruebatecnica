import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

@ApiTags('usuarios')
@Controller('usuarios')
@UseGuards(AuthGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiCreatedResponse({ type: Usuario })
  @ApiBadRequestResponse({ description: 'El usuario ya existe' })
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  @ApiOkResponse({ type: [Usuario] })
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene el usuario por su id' })
  @ApiOkResponse({ type: Usuario })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualiza el usuario por id' })
  @ApiOkResponse({ type: Usuario })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Borra usuario por id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

  @ApiOperation({ summary: 'Agregar grupos a usuario' })
  @ApiOkResponse({
    type: Usuario,
  })
  @Put(':usuarioId')
  addGrupoToUsuario(
    @Param('usuarioId') usuarioId: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.addGrupoToUsuario(usuarioId, updateUsuarioDto);
  }
}
