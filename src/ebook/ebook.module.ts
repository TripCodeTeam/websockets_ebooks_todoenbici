import { Module } from '@nestjs/common';
import { EbookService } from './ebook.service';
import { EbookController } from './ebook.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EbookController],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [EbookService, PrismaService],
})
export class EbookModule {}
