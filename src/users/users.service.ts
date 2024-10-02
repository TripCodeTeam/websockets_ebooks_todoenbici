import { Body, Injectable, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPass = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.clients.create({
      data: {
        completeName: createUserDto.completeName,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPass,
        created_at: createUserDto.created_at ?? new Date(),
        updated_at: createUserDto.updated_at ?? new Date(),
        rol: createUserDto.rol !== null ? createUserDto.rol : null,
        books_purchased: {
          create: createUserDto.books_purchased?.map((book) => ({
            bookId: book.bookId,
            purchasedRecordId: book.purchasedRecordId,
          })),
        },
      },
    });
  }

  // Método para buscar un usuario por email (para login)
  async findByEmail(email: string) {
    return await this.prisma.clients.findUnique({
      where: { email },
    });
  }

  // Método para comparar contraseñas
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Ruta protegida que solo pueden acceder los usuarios autenticados
  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Body() user: any) {
    return user; // Aquí podrías devolver los detalles del perfil del usuario autenticado
  }
}
