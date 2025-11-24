import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async addReview(userId: string, productId: string, dto: CreateReviewDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const review = await this.prisma.review.create({
      data: {
        userId,
        productId,
        rating: dto.rating,
        comment: dto.comment,
      },
    });

    await this.updateProductRating(productId);

    return review;
  }

  getProductReviews(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateProductRating(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { productId },
    });

    const totalReviews = reviews.length;
    const avg =
      totalReviews === 0
        ? 0
        : reviews.reduce((s, r) => s + r.rating, 0) / totalReviews;

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        averageRating: avg,
        totalReviews: totalReviews,
      },
    });
  }
}
