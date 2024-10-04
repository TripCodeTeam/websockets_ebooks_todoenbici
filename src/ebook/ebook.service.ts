import { Injectable } from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScalarBooks } from 'src/types/Books';

@Injectable()
export class EbookService {
  constructor(private prisma: PrismaService) {}

  // Método para crear un nuevo libro
  async create(createEbookDto: CreateEbookDto) {
    try {
      const newBook = await this.prisma.books.create({
        data: {
          nameBook: createEbookDto.nameBook,
          description: createEbookDto.description,
          author: createEbookDto.author,
          price: createEbookDto.price,
          number_pages: createEbookDto.number_pages,
          editorial: createEbookDto.editorial,
          language: createEbookDto.language
            ? (createEbookDto.language as string[])
            : [],
          genre: createEbookDto.genre ? (createEbookDto.genre as string[]) : [],
          cover_page: createEbookDto.cover_page,
          back_cover: createEbookDto.back_cover,
          stock: createEbookDto.stock,
          upId: createEbookDto.upId,
          media: createEbookDto.media,
          isPhysical: createEbookDto.isPhysical as boolean,
          isVirtual: createEbookDto.isVirtual as boolean,
          sellerId: createEbookDto.sellerId as string,
        },
      });
      console.log('New Book: ', newBook);
      return { success: true, data: newBook };
    } catch (error) {
      console.log('new Book Error: ', error);
      if (error instanceof Error) {
        return { success: true, error: error.message };
      }
    }
  }

  // Método para obtener todos los libros
  async getAllBooks() {
    try {
      const books = await this.prisma.books.findMany();

      if (!books) throw new Error('Error al obtener libros');
      if (books.length === 0) throw new Error('No hay libros disponibles');

      if (books) return { success: true, data: books };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  // Método para obtener la lista de libros comprados de un cliente
  async getPurchasedBooks(clientId: string) {
    const client = await this.prisma.clients.findUnique({
      where: { id: clientId },
      include: {
        books_purchased: {
          include: {
            purchasedRecord: true,
          },
        },
      },
    });

    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    return client.books_purchased;
  }

  async onlyBook(bookId: string) {
    try {
      const book: ScalarBooks = await this.prisma.books.findFirst({
        where: { id: bookId },
      });

      if (!book) throw new Error('El libro no existe');
      return { success: true, data: book };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  // Método para verificar si un cliente ha comprado un libro
  async hasPurchasedBook(clientId: string, bookId: string) {
    try {
      // Verificamos si existe un registro en BooksClient que relacione al cliente con el libro
      const purchaseRecord = await this.prisma.booksClient.findFirst({
        where: {
          clientId,
          bookId,
        },
        include: {
          purchasedRecord: true, // Incluimos la relación para asegurar que existe un registro de compra
        },
      });

      if (!purchaseRecord) {
        throw new Error('El cliente no ha comprado este libro');
      }

      // Retornamos éxito si la compra existe
      return {
        success: true,
        message: 'El cliente ha comprado este libro',
        data: purchaseRecord,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  }

  async AllBooksClient(sellerId: string) {
    try {
      const allBooks = await this.prisma.books.findMany({
        where: { sellerId },
      });
      return { success: true, data: allBooks };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}
