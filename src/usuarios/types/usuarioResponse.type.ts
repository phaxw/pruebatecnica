import { Usuario } from '../entities/usuario.entity';

export type UsuarioResponseType = Omit<Usuario, 'password'>;
