import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/uapaverse/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // lista todos los usuarios
  @Get('list')
  listarUsuarios() {
    return this.usersService.listarUsuarios();
  }

  // busca un usuario por su id
  @Get(':id')
  obtenerUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.obtenerUsuario(id);
  }

  // actualiza los datos básicos del usuario
  @Put(':id')
  actualizarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    datos: {
      name_usuario?: string;
      email_usuario?: string;
      rol_id?: number;
    },
  ) {
    return this.usersService.actualizarUsuario(id, datos);
  }
}