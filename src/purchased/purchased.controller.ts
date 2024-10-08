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

  @Post('reject/ok/:id')
  rejectPurchased(@Param('id') purchasedId: string) {
    return this.purchasedService.rejectPurchased(purchasedId);
  }

  @Get('all/:id')
  CurrentOrders(@Param('id') sellerId: string) {
    return this.purchasedService.getPurchasedBySeller(sellerId);
  }

  @Post('voucher/:id')
  uploadVoucher(
    @Param('id') purchasedId: string,
    @Body() data: { url: string },
  ) {
    return this.purchasedService.uploadVoucherPurchased(purchasedId, data.url);
  }

  // Obtiene todas las compras aprobadas de un vendedor
  @Get('approved/:id')
  getApprovedOrders(@Param('id') sellerId: string) {
    return this.purchasedService.getApprovedPurchasedBySeller(sellerId);
  }

  // Obtiene todas las compras de un cliente (muestra el proceso de la orden)
  @Get('client/:id')
  getOrdersByClient(@Param('id') clientId: string) {
    return this.purchasedService.getPurchasedByClient(clientId);
  }
}
