import { Module } from '@nestjs/common';
import { PurchasedService } from './purchased.service';
import { PurchasedController } from './purchased.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PurchasedController],
  providers: [PurchasedService, PrismaService],
})
export class PurchasedModule {}
