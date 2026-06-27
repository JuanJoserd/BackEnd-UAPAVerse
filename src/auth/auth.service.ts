import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email_usuario: registerDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado.');
    }

    const role = await this.prisma.role.findUnique({
      where: {
        id: registerDto.roleId,
      },
    });

    if (!role) {
      throw new BadRequestException('El rol indicado no existe.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name_usuario: registerDto.fullName,
        email_usuario: registerDto.email,
        password_usuario: hashedPassword,
        rol_id: registerDto.roleId,
      },
      include: {
        role: true,
      },
    });

    if (registerDto.roleId === 3 && registerDto.entName) {
      if (!registerDto.telephoneNumber) {
        throw new BadRequestException('El teléfono de la empresa es obligatorio.');
      }

      if (!registerDto.companyEmail) {
        throw new BadRequestException('El correo de la empresa es obligatorio.');
      }

      if (!registerDto.businessSectorId) {
        throw new BadRequestException('El sector de la empresa es obligatorio.');
      }

      if (!registerDto.businessSizeId) {
        throw new BadRequestException('El tamaño de la empresa es obligatorio.');
      }

      await this.prisma.company.create({
        data: {
          nombre_comercial: registerDto.entName,
          logo: registerDto.logo,
          telefono: registerDto.telephoneNumber,
          email_contacto: registerDto.companyEmail,
          user_id: user.id,
          sector_id: registerDto.businessSectorId,
          company_size_id: registerDto.businessSizeId,
          subsector_id: registerDto.subSectorId,
        },
      });
    }

    return {
      message: 'Usuario registrado correctamente.',
      user: {
        id: user.id,
        name: user.name_usuario,
        email: user.email_usuario,
        role: user.role.name_rol,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email_usuario: loginDto.email,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const passwordIsValid = await bcrypt.compare(
      loginDto.password,
      user.password_usuario,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const payload = {
      sub: user.id,
      email: user.email_usuario,
      role: user.role.name_rol,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Inicio de sesión correcto.',
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name_usuario,
        email: user.email_usuario,
        role: user.role.name_rol,
      },
    };
  }
}