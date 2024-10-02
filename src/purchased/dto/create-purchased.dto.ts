import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreatePurchasedDto {
  @IsString()
  @IsNotEmpty()
  clientId: string; // ID del cliente que realiza la compra

  @IsString()
  @IsNotEmpty()
  bookId: string; // ID del libro que se está comprando

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean = false; // Opcional, indica si la compra está aprobada o no

  @IsString()
  @IsOptional()
  purchasedKey?: string = 'sin aprobacion'; // Clave de la compra, puede generarse automáticamente
}
