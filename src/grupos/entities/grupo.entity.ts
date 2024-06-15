import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type GrupoDocument = Grupo & Document;

@Schema()
export class Grupo {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tarea' }] })
  tareas: Types.ObjectId[];
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
