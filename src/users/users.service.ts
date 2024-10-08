import {
  Body,
  Injectable,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPass = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await this.prisma.clients.create({
        data: {
          completeName: createUserDto.completeName,
          username: createUserDto.username,
          email: createUserDto.email,
          password: hashedPass,
          created_at: createUserDto.created_at ?? new Date(),
          updated_at: createUserDto.updated_at ?? new Date(),
          rol: createUserDto.rol !== null ? createUserDto.rol : null,
          avatar: createUserDto.avatar,
          books_purchased: {
            create: createUserDto.books_purchased?.map((book) => ({
              bookId: book.bookId,
              purchasedRecordId: book.purchasedRecordId,
            })),
          },
        },
      });

      if (newUser) {
        return { success: true, data: newUser };
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
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

  // Método para obtener usuario sin información sensible
  async getSafeUser(userId: string) {
    if (!userId) {
      throw new Error('userId is required!'); // Asegúrate de que se lanza el error si el userId no está presente
    }

    const user = await this.prisma.clients.findUnique({
      where: { id: userId },
      include: {
        books_purchased: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...safeUser } = user; // Excluye la contraseña
    return safeUser;
  }

  // Ruta protegida que solo pueden acceder los usuarios autenticados
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Body() user: any) {
    return this.getSafeUser(user.id); // Aquí podrías devolver los detalles del perfil del usuario autenticado
  }
}
