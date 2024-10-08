interface BooksClients {
  bookId: string;
  purchasedRecordId: string;
}

export type rolUser = 'READER' | 'SELLER';

export class CreateUserDto {
  id?: string;
  completeName: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  books_purchased?: BooksClients[]; // Esto será manejado en la creación anidada
  rol?: rolUser;
  created_at?: Date;
  updated_at?: Date;
}
