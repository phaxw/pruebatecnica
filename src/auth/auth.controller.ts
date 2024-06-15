import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginDto } from './dto/login-usuario.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login para generar token jwt' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Registro de usuarios' })
  @Post('register')
  register(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuarioRegistrado = this.authService.register(createUsuarioDto);
    return usuarioRegistrado;
  }
}
