import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Types } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Grupo' }] })
  grupos: Types.ObjectId[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

UsuarioSchema.pre<Usuario>('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
