export type ScalarClients = {
  id?: string;
  completeName: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  books_purchased?: string[];
  rol?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type SafeScalarClients = Omit<ScalarClients, 'password'>;

export type ScalarBooks = {
  id?: string;
  nameBook: string;
  description: string;
  author: string;
  price: number;
  number_pages: number;
  editorial?: string;
  language: String[];
  genre: String[];
  stock: number;
  rating: number;
  isPhysical: Boolean;
  isVirtual: Boolean;
  upId: string;
  media: string;
  created_at?: Date;
  updated_at?: Date;
};

export type ScalarPurchased = {
  id?: string;
  clientId: string;
  bookId: String;
  purchased_key: String;
  created_at?: Date;
  updated_at?: Date;
};

export type ScalarPurchasedRecord = {
  id?: string;
  bookId: string;
  purchased_key: string;
  created_at?: Date;
  updated_at?: Date;
};
