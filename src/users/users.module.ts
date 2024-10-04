import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [ConfigModule.forRoot({ isGlobal: true }), JwtModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
