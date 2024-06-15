import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginDto } from './dto/login-usuario.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(loginDto.email);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const passwordValido = await bcryptjs.compare(
      loginDto.password,
      usuario.password,
    );

    if (!passwordValido) {
      throw new UnauthorizedException('Usuario o contraseña incorrecto');
    }

    const payload = { email: usuario.email };
    const token = await this.jwtService.signAsync(payload);

    return { token: token };
  }

  async register(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuariosService.findByEmail(
      createUsuarioDto.email,
    );

    if (usuario) {
      throw new BadRequestException('Usuario ya existe');
    }
    const usuarioRegistrado =
      await this.usuariosService.create(createUsuarioDto);

    return usuarioRegistrado;
  }
}
