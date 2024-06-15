import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Grupo } from './entities/grupo.entity';

@ApiTags('grupos')
@Controller('grupos')
@UseGuards(AuthGuard)
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @ApiOperation({ summary: 'Crea un nuevo grupo' })
  @ApiCreatedResponse({
    type: Grupo,
  })
  @ApiBadRequestResponse({ description: 'Ya existe un grupo con ese nombre' })
  @Post()
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @ApiOperation({ summary: 'Obtiene todos los grupos' })
  @ApiOkResponse({ description: 'Retorna un arreglo de grupos', type: [Grupo] })
  @ApiBadRequestResponse({ description: 'Grupos no encontrados' })
  @Get()
  findAll() {
    return this.gruposService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un grupo por su id' })
  @ApiOkResponse({ description: 'Retorna un grupo', type: Grupo })
  @ApiBadRequestResponse({ description: 'Grupo no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gruposService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualiza un grupo por su id' })
  @ApiOkResponse({ description: 'Retorna el grupo', type: Grupo })
  @ApiBadRequestResponse({ description: 'Grupo no encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(id, updateGrupoDto);
  }

  @ApiOperation({ summary: 'borra un grupo mediante su id' })
  @ApiOkResponse({ type: Grupo })
  @ApiBadRequestResponse({ description: 'Grupo no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gruposService.remove(id);
  }
}
