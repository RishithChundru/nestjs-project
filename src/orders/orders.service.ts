import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const jsonItems = JSON.parse(JSON.stringify(dto.items));

    const order = await this.prisma.order.create({
      data: {
        userId,
        items: jsonItems, 
        totalAmount: total,
      },
    });

    await this.prisma.cartItem.deleteMany({
      where: { userId },
    });

    return order;
  }

  getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async updateStatus(orderId: string, status: string) {
  return this.prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

}
