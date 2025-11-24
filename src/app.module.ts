import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),PrismaModule, UsersModule, AuthModule, CategoriesModule, ProductsModule, CartModule, OrdersModule, ReviewsModule],
})
export class AppModule {}
