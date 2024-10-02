import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePurchasedDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;
}
