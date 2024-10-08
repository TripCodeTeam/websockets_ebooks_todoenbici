export class CreateEbookDto {
  id?: string;
  nameBook: string;
  cover_page: string;
  back_cover: string;
  description: string;
  author: string;
  price: number;
  rating: number;
  number_pages: number;
  editorial?: string;
  language: string[];
  genre: string[];
  stock?: number;
  upId?: string;
  media?: string;
  isPhysical: Boolean;
  isVirtual: Boolean;
  sellerId: string;
  created_at?: Date;
  updated_at?: Date;
}
