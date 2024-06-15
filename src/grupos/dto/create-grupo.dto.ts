import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGrupoDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;
}
