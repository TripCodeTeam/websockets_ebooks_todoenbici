import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EbookModule } from './ebook/ebook.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PurchasedModule } from './purchased/purchased.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

@Module({
  imports: [
    EbookModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PurchasedModule,
    AuthModule
  ],
  providers: [AppService, JwtAuthGuard],
  controllers: [AppController],
})
export class AppModule {}
