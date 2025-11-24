import {Controller,Post,Body,Get,Delete,Param,Patch,UseGuards,Req,} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  add(@Req() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, dto);
  }

  @Get()
  getCart(@Req() req) {
    return this.cartService.getUserCart(req.user.userId);
  }

  @Patch(':id')
  updateQty(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.cartService.updateQuantity(id, quantity);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  @Delete()
  clear(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
