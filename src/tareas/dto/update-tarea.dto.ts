import { PartialType } from '@nestjs/swagger';
import { CreateTareaDto } from './create-tarea.dto';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly tareas?: Types.ObjectId[];
}
