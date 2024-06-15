import { PartialType } from '@nestjs/swagger';
import { CreateGrupoDto } from './create-grupo.dto';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly tareas?: Types.ObjectId[];
}
