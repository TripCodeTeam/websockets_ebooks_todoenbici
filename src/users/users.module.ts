import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
