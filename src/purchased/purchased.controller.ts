import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasedService } from './purchased.service';
import { CreatePurchasedDto } from './dto/create-purchased.dto';

@Controller('purchased')
export class PurchasedController {
  constructor(private readonly purchasedService: PurchasedService) {}

  @Post()
  create(@Body() createPurchasedDto: CreatePurchasedDto) {
    const clientId = createPurchasedDto.clientId;
    const bookId = createPurchasedDto.bookId;
    return this.purchasedService.createPurchased(clientId, bookId);
  }

  // Aprobacion de orden
  @Post('approve/ok/:id')
  approvePurchase(@Param('id') purchasedId: string) {
    return this.purchasedService.approvePurchased(purchasedId);
  }

  @Get('all/:id')
  CurrentOrders(@Param('id') sellerId: string) {
    return this.purchasedService.getPurchasedBySeller(sellerId)
  }
}
