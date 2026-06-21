import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('api/uapaverse/role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // devuelve la lista de roles
  @Get('list')
  listarRoles() {
    return this.rolesService.listarRoles();
  }
}