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
    // Verificamos que el cliente y el libro existan en paralelo
    const [clientExists, bookExists] = await Promise.all([
      this.prisma.clients.findUnique({ where: { id: clientId } }),
      this.prisma.books.findUnique({ where: { id: bookId } }),
    ]);

    if (!clientExists || !bookExists) {
      // Lanzamos un error si no encontramos el cliente o el libro
      throw new Error(
        clientExists ? 'Libro no encontrado' : 'Cliente no encontrado',
      );
    }

    // Creamos un nuevo registro de compra (Purchased)
    const newPurchased = await this.prisma.purchased.create({
      data: {
        clientId, // Referencia al id del cliente
        bookId, // Referencia al id del libro
      },
    });

    // Retornamos la información de éxito
    return { success: true, data: { clientId, bookId } };
  }
}
