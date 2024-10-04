import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EbookService } from './ebook.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { GetBooksByClientDto } from './dto/get-books-by-client'; // DTO para obtener libros por cliente

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  // Ruta para obtener la lista de todos los libros
  @Get('all')
  getAllBooks() {
    return this.ebookService.getAllBooks();
  }

  @Get('all/:id')
  getAllBooksClient(@Param('id') clientId: string) {
    return this.ebookService.AllBooksClient(clientId);
  }

  @Get(':id')
  findBook(@Param('id') bookId: string) {
    return this.ebookService.onlyBook(bookId);
  }

  // Ruta para crear un nuevo libro
  @Post()
  create(@Body() createEbookDto: CreateEbookDto) {
    return this.ebookService.create(createEbookDto);
  }

  // Ruta para obtener libros comprados por un cliente
  @Post('client/books')
  booksByClient(@Body() getBooksByClientDto: GetBooksByClientDto) {
    const { clientId } = getBooksByClientDto;
    return this.ebookService.getPurchasedBooks(clientId);
  }

  @Post('is_owner')
  isOwnerBook(@Body() data: { clientId: string; bookId: string }) {
    return this.ebookService.hasPurchasedBook(data.clientId, data.bookId);
  }
}
