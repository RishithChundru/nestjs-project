import { Controller, Post, Get, Body, Req, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':productId')
  @UseGuards(JwtAuthGuard)
  createReview(@Req() req, @Param('productId') productId: string, @Body() dto: CreateReviewDto,) {
    return this.reviewsService.addReview(req.user.userId, productId, dto);
  }

  @Get(':productId')
  getReviews(@Param('productId') productId: string) {
    return this.reviewsService.getProductReviews(productId);
  }
}
