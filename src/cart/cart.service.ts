import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: string, dto: AddToCartDto) {
    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, productId: dto.productId },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: { userId, productId: dto.productId, quantity: dto.quantity },
    });
  }

  getUserCart(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
    });
  }

  updateQuantity(id: string, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  removeItem(id: string) {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }

  clearCart(userId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}
