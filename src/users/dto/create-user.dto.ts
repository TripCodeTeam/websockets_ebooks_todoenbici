interface BooksClients {
  bookId: string;
  purchasedRecordId: string;
}

export class CreateUserDto {
  id?: string;
  completeName: string;
  username: string;
  email: string;
  password: string;
  books_purchased?: BooksClients[]; // Esto será manejado en la creación anidada
  rol?: string;
  created_at?: Date;
  updated_at?: Date;
}
