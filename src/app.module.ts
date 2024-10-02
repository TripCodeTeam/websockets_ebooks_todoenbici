import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EbookModule } from './ebook/ebook.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PurchasedModule } from './purchased/purchased.module';

@Module({
  imports: [
    EbookModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PurchasedModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
