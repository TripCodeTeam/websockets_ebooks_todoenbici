import { IsString, IsNotEmpty } from 'class-validator';

export class GetBooksByClientDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
}
