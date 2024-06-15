import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTareaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;
}
