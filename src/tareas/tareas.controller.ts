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
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Tarea } from './entities/tarea.entity';

@ApiTags('tareas')
@Controller('tareas')
@UseGuards(AuthGuard)
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @ApiOperation({ summary: 'Crea una nueva tarea' })
  @ApiCreatedResponse({
    type: Tarea,
  })
  @Post()
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las tareas' })
  @ApiCreatedResponse({
    type: [Tarea],
  })
  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene una tarea por su id' })
  @ApiCreatedResponse({
    type: Tarea,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualiza una tarea' })
  @ApiCreatedResponse({
    type: Tarea,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @ApiOperation({ summary: 'Borra una tarea' })
  @ApiCreatedResponse({
    type: Tarea,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(id);
  }
}
