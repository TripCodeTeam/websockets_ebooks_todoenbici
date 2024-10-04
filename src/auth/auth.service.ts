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
  async validateUser(email: string, password: string): Promise<SafeScalarClients> {
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
    console.log('User to log in:', user);

    if (!user.id) {
      throw new UnauthorizedException('User ID is missing');
    }
    // Generamos el token sin verificar si el user tiene id porque ya lo validamos antes
    const payload = { userId: user.id }; // Ahora, 'user' debería tener 'id' si la validación fue exitosa
    const token = this.jwtService.sign(payload);
    console.log('Generated Token:', token);
    return {
      access_token: token,
    };
  }

  // Método para obtener la información del usuario a partir del token
  async getProfile(userId: string) {
    const user = await this.usersService.getSafeUser(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
