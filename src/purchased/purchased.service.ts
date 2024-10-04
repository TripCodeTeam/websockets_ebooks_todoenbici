import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Importamos para generar purchased_key
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchasedService {
  constructor(private prisma: PrismaService) {}

  // Método para aprobar la compra de un libro
  async approvePurchased(purchasedId: string) {
    try {
      const uniqueKeyAprobbed = uuidv4();

      // Actualizamos la orden de compra con la clave aprobada
      const order = await this.prisma.purchased.update({
        where: { id: purchasedId },
        data: {
          isAproved: true,
          purchased_key: uniqueKeyAprobbed,
        },
        // include: { book: true, client: true }, // Incluimos las relaciones necesarias
      });

      if (!order) throw new Error('Error aprobando orden');

      // Creamos un nuevo registro de aprobación
      const recordApprovedOrder = await this.prisma.purchasedRecord.create({
        data: {
          bookId: order.bookId,
          purchased_key: uniqueKeyAprobbed,
          clientId: order.clientId,
        },
      });

      if (!recordApprovedOrder)
        throw new Error('Error creando registro de aprobación');

      // Asociamos el libro comprado al cliente en `BooksClient`
      const addBookToClient = await this.prisma.booksClient.create({
        data: {
          clientId: order.clientId,
          bookId: order.bookId,
          purchasedRecordId: recordApprovedOrder.id,
        },
      });

      if (!addBookToClient) throw new Error('Error agregando libro a usuario');

      return {
        message: 'Compra aprobada con éxito',
        data: recordApprovedOrder,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return { message: 'Compra declinada' };
      }
    }
  }

  // Método para crear un nuevo registro de compra (Purchased)
  async createPurchased(clientId: string, bookId: string) {
    // Creamos un nuevo registro de compra (Purchased)
    await this.prisma.purchased.create({
      data: {
        clientId, // Referencia al id del cliente
        bookId, // Referencia al id del libro
      },
    });

    // Retornamos la información de éxito
    return { success: true, data: { clientId, bookId } };
  }

  // Añade el método para obtener las compras de libros por sellerId
  async getPurchasedBySeller(sellerId: string) {
    try {
      const purchasedBooks = await this.prisma.purchased.findMany({
        where: {
          book: {
            sellerId: sellerId, // Filtra por sellerId en los libros
          },
        },
        include: {
          book: true, // Incluye información del libro
          client: true, // Incluye información del cliente que compró el libro
        },
      });

      if (!purchasedBooks)
        throw new Error('No se encontraron compras para este vendedor');
      return { success: true, data: purchasedBooks };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}
