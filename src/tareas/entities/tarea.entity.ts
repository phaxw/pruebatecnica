import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TareaDocument = Tarea & Document;

@Schema()
export class Tarea {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;
}

export const TareaSchema = SchemaFactory.createForClass(Tarea);
