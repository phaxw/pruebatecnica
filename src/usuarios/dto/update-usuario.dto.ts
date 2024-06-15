import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly telefono: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly grupos?: Types.ObjectId[];
}
