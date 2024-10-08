import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SafeScalarClients } from 'src/types/Books';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: SafeScalarClients) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload);
  }

  // Método de login
  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeScalarClients> {
    const user = await this.usersService.findByEmail(email);
    console.log('User Found:', user); // Para depuración
    if (
      user &&
      (await this.usersService.comparePasswords(password, user.password))
    ) {
      const { password, ...result } = user; // Se excluye la contraseña
      return result as SafeScalarClients; // 'result' debe tener un campo 'id'
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Método para generar el token JWT
  async login(user: any) {
    try {
      console.log('User to log in:', user);

      if (!user.id) {
        throw new UnauthorizedException('User ID is missing');
      }
      // Generamos el token sin verificar si el user tiene id porque ya lo validamos antes
      const payload = { userId: user.id }; // Ahora, 'user' debería tener 'id' si la validación fue exitosa
      const token = this.jwtService.sign(payload);
      // console.log('Generated Token:', token);
      return {
        success: true,
        access_token: token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }
  }

  // Método para obtener la información del usuario a partir del token
  async getProfile(userId: string) {
    try {
      const user = await this.usersService.getSafeUser(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return { success: true, data: user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: true, error: error.message };
      }
    }
  }
}
